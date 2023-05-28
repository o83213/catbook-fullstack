import { useMemo } from "react";
import { APOLLO_STATE_PROP_NAME, initializeApollo } from "../lib/apolloClient";

export async function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(async () => await initializeApollo(state), [state]);
  return store;
}
