import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404</title>
        <meta name="Xtreme Tracking 404 Page" />
      </Head>
      <h1 className="center">This page does not exist or is unavailable.</h1>
    </>
  );
}
