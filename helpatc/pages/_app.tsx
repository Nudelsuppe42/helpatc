import "../styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 16000,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
        shouldRetryOnError: false,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }}
    >
      <Head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>Logo</title>
        <meta name="HandheldFriendly" content="True" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700&family=Poppins:wght@300;400&display=swap"
          rel="stylesheet"
        />
        <meta property="og:site_name" content="IVAO ATC Tool" />
        <meta property="og:type" content="tool" />
        <meta property="og:title" content="ATC Tool" />
        <meta
          property="og:description"
          content="IVAO ATC Tool is a tool to help Controllers manage their duties."
        />
        <meta
          property="og:image"
          content="https://brand.ivao.aero/content/images/2021/04/green.png"
        />
      </Head>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
