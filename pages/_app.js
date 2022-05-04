import Head from "next/head";

import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { SSRProvider } from "react-bootstrap";
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
