import Head from "next/head";

import { SSRProvider } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { StoreProvider } from "../context";

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <StoreProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    </SSRProvider>
  );
}

export default MyApp;
