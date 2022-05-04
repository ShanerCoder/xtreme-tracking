import SocialForm from "../components/forms/SocialForm";
import Card from "../components/ui/Card";
import LighterDiv from "../components/ui/LighterDiv";
import classes from "./PageStyling.module.css";
import BannerImage from "../components/ui/BannerImage";
import { useRouter } from "next/router";
import { dbConnect } from "../lib/db-connect";
import Post from "../models/post";
import User from "../models/user";

function SocialPage(props) {
  const router = useRouter();

  async function addPostHandler(NewPostData) {
    const response = await fetch("/api/user_posts", {
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

  await dbConnect();
  const post = Post.find();
  const user = await User.findOne({ username: "test" });
  const userDoc = user._doc;
  console.log(userDoc);
  const filter = {};
  const userpostList = await post.find(filter).sort({ _id: -1 });
  return {
    props: {
      userposts: userpostList.map((post) => ({
        id: post._id.toString(),
        //username: post.username
        postText: post.postText,
        dateAdded: post.createdAt.toString(),
      })),
    },
  };
}

export default SocialPage;
