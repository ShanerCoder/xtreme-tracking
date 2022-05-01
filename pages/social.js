import SocialForm from "../components/forms/SocialForm";
import Card from "../components/ui/Card";
import LighterDiv from "../components/ui/LighterDiv";
import classes from "./PageStyling.module.css";
import BannerImage from "../components/ui/BannerImage";
import { useRouter } from "next/router";
import { dbConnect } from "../lib/db-connect";

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
      {<SocialForm userposts={props.userposts} onAddPost={addPostHandler} />}
    </section>
  );
}

export async function getServerSideProps() {
  // fetch data from an API

  const client = await dbConnect();
  const db = client.db();
  const userpostsCollection = await db.collection("user-posts");

  const userpostList = await userpostsCollection
    .find()
    .sort({ _id: -1 })
    .toArray();

  return {
    props: {
      userposts: userpostList.map((post) => ({
        id: post._id.toString(),
        //username: post.username
        postText: post.postText,
        dateAdded: post.dateAdded,
      })),
    },
  };
}

export default SocialPage;
