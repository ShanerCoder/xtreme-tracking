import Head from "next/head";
import { SSRProvider } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { StoreProvider } from "../context";
import { LoadingScreenStoreProvider } from "../context/loadingScreen";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="xtremeTracking"
          content="initial-scale=1.0, width=device-width"
        />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
      </Head>

      <SSRProvider>
        <StoreProvider>
          <LoadingScreenStoreProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </LoadingScreenStoreProvider>
        </StoreProvider>
      </SSRProvider>
    </>
  );
}

export default MyApp;
