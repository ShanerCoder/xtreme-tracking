import Head from "next/head";
import SocialForm from "../components/forms/SocialForm";
import Card from "../components/ui/Card";
import LighterDiv from "../components/ui/LighterDiv";
import BannerImage from "../components/ui/BannerImage";
import { useRouter } from "next/router";
import { dbConnect } from "../lib/db-connect";
import Post from "../models/post";
import { useStore } from "../context";
import { getValue } from "../utils/common";

function SocialPage(props) {
  const router = useRouter();
  const [state] = useStore();
  const user = getValue(state, ["user"], null);

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

  console.log(props.userposts[0].profilePictureId);
  return (
    <>
      <Head>
        <title>Social Page</title>
        <meta
          name="Xtreme Tracking Social Page"
          content="Browse the public forum here!"
        />
      </Head>
      <LighterDiv>
        <Card>
          <h2 className="center">Social Page</h2>
          <BannerImage
            className="center"
            imageSource="/socialpage/BannerImage.png"
          />
        </Card>
      </LighterDiv>
      {
        <SocialForm
          userposts={props.userposts}
          onAddPost={addPostHandler}
          user={user}
        />
      }
    </>
  );
}

export async function getServerSideProps() {
  // Connecting to DB and finding posts
  await dbConnect();
  const post = Post.find();
  const filter = {};
  const userpostList = await post.find(filter).sort({ _id: -1 });

  return {
    props: {
      userposts: userpostList.map((post) => ({
        id: post._id.toString(),
        username: post.username,
        postText: post.postText,
        dateAdded: post.createdAt.toString(),
      })),
    },
  };
}

export default SocialPage;
