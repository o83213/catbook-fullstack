import type { AppPropsWithLayout } from "next/app";
import { ThemeProvider } from "styled-components";
import theme from "../src/styles/theme";
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject
} from "@apollo/client";
import React, { useEffect, useState } from "react";
import { CachePersistor, LocalStorageWrapper } from "apollo3-cache-persist";
import { APOLLO_STATE_PROP_NAME, initializeApollo } from "@lib/apolloClient";
import { cache } from "@lib/cache";
import Head from "next/head";
import { GlobalStyles } from "styles/global";
import { getDataFromToken } from "@utils/getDataFromToken";
import { Toaster } from "react-hot-toast";
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [client, setClient] =
    useState<ApolloClient<NormalizedCacheObject> | null>();
  useEffect(() => {
    async function init() {
      const state = pageProps[APOLLO_STATE_PROP_NAME];
      const store = initializeApollo(state);
      setClient(store);
    }
    init().catch(console.error);
  }, []);

  if (!client) {
    return <h2>Initializing app...</h2>;
  }
  const getLayout = Component.getLayout || ((page: React.ReactNode) => page);
  const userInfo = getDataFromToken();
  pageProps.userInfo = userInfo;
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Head>
          <title>Cat book</title>
          <meta property="og:title" content="Cat Book" key="title" />
        </Head>
        {getLayout(<Component {...pageProps} />)}
        <Toaster />
      </ThemeProvider>
    </ApolloProvider>
  );
}
