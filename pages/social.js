import SocialForm from "../components/forms/SocialForm";
import Card from "../components/ui/Card";
import LighterDiv from "../components/ui/LighterDiv";
import classes from "./PageStyling.module.css";
import BannerImage from "../components/ui/BannerImage";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { useRouter } from "next/router";

function SocialPage(props) {
  const router = useRouter();

  async function addPostHandler(NewPostData) {
    const response = await fetch("/api/user-posts", {
      method: "POST",
      body: JSON.stringify(NewPostData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    router.push("/social");
  }

  return (
    <section>
      <LighterDiv>
        <Card>
          <h2 className={classes.center}>Social Page</h2>
          <BannerImage
            className={classes.center}
            imageSource="/socialpage/BannerImage.png"
          />
        </Card>
      </LighterDiv>
      <SocialForm userposts={props.userposts} onAddPost={addPostHandler} />
    </section>
  );
}
/*
export async function getStaticProps() {
  // fetch data from an API

  const client = await MongoClient.connect(
    "mongodb+srv://shaner:X1FFY8qVQ5yYi3AE@cluster0.vxyoc.mongodb.net/user-posts?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("user-posts");

  const meetups = await meetupsCollection
    .find()
    .sort({ dateAdded: -1 })
    .toArray();

  client.close();

  return {
    props: {
      userposts: meetups.map((post) => ({
        id: post._id.toString(),
        //username: post.username
        postText: post.postText,
        dateAdded: post.dateAdded,
      })),
    },
    revalidate: 1,
  };
}*/

export async function getServerSideProps() {
  // fetch data from an API

  const client = await MongoClient.connect(
    "mongodb+srv://shaner:X1FFY8qVQ5yYi3AE@cluster0.vxyoc.mongodb.net/user-posts?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("user-posts");

  const meetups = await meetupsCollection.find().sort({ _id: -1 }).toArray();

  client.close();

  return {
    props: {
      userposts: meetups.map((post) => ({
        id: post._id.toString(),
        //username: post.username
        postText: post.postText,
        dateAdded: post.dateAdded,
      })),
    },
  };
}

export default SocialPage;
