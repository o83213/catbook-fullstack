import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  Observable,
  from,
  NormalizedCacheObject,
  split
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
// import { CachePersistor } from "apollo3-cache-persist";
//
import { isBrowser } from "@utils/isBrowser";
import { isTokenExpired } from "@utils/isTokenExpired";
import { cache } from "./cache";
import { refreshAccessToken } from "@services/refreshAccessToken";
export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((operation) => {
          const accessToken = operation.getContext().accessToken;
          if (accessToken) {
            operation.setContext({
              headers: {
                authorization: `Bearer ${accessToken}`
              }
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);
// web socket server
const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url:
            process.env.NODE_ENV === "production"
              ? process.env.NEXT_PUBLIC_WSS_ENDPOINT + "/graphql/subscriptions"
              : "ws://localhost:4000/graphql/subscriptions",
          connectionParams: async () => {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
              return { accessToken: "" };
            }
            if (isTokenExpired(accessToken)) {
              const accessToken = await refreshAccessToken();
              return { accessToken: `Bearer ${accessToken}` };
            }
            return { accessToken: `Bearer ${accessToken}` };
          }
        })
      )
    : null;
//
const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_ENDPOINT + "/graphql"
      : "http://localhost:4000/graphql",
  credentials: "include"
});
//
const link =
  typeof window !== "undefined"
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink!,
        httpLink
      )
    : httpLink;

//
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    let isRedirectLogin = false;
    const res = operation.getContext()?.res;
    if (typeof window !== "undefined") {
      if (graphQLErrors) {
        console.log("[graphQLErrors]:", graphQLErrors);
        for (const err of graphQLErrors) {
          if (err.extensions?.code === "NOT_AUTHENTICATED") {
            isRedirectLogin = true;
            break;
          }
        }
      }
      if (isRedirectLogin) {
        console.log("redirect to login page");
        location.href = "/logout";
        return;
      }
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }
    return forward(operation);
  }
);

function createApolloClient() {
  return new ApolloClient({
    ssrMode: !isBrowser(),
    link: from([asyncTokenRefreshLink, errorLink, requestLink, link]),
    cache: cache,
    defaultOptions: {
      query: {
        fetchPolicy: "network-only"
      }
    }
  });
}

const asyncTokenRefreshLink = setContext(() => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return { accessToken: "" };
  }
  if (isTokenExpired(accessToken)) {
    return refreshAccessToken().then((accessToken) => {
      return { accessToken };
    });
  }
  return { accessToken };
});

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    console.log("existingCache", existingCache);
    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        )
      ]
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (!isBrowser()) return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}
