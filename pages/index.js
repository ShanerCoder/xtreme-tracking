import Head from "next/head";
import HomeForm from "../components/forms/HomeForm";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>Xtreme Tracking</title>
        <meta name="Xtreme Tracking Home Page" content="Xtreme Tracking" />
      </Head>
      <HomeForm />
    </>
  );
}

export default HomePage;
