import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <>
      <Head>
        <meta name="home page" content="Browse meetings available" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  // fetch data from an API

  MongoClient.connect();
  const client = await MongoClient.connect(
    "mongodb+srv://shaner:X1FFY8qVQ5yYi3AE@cluster0.vxyoc.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
        description: meetup.description,
      })),
    },
    revalidate: 300,
  };
}

export default HomePage;
