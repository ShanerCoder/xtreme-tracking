import { MongoClient, ObjectId } from "mongodb";
import PostDetails from "../../components/form-components/SocialPage/PostDetails";
import classes from "../PageStyling.module.css";

function PostThreadView(props) {
  return (
    <>
      <PostDetails
        key={props.userposts.id}
        id={props.userposts.id}
        //username={props.userposts.username}
        postText={props.userposts.postText}
        dateAdded={props.userposts.dateAdded}
      />
      <h2 className={classes.padding_top}>No Comments Added</h2>
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://shaner:X1FFY8qVQ5yYi3AE@cluster0.vxyoc.mongodb.net/user-posts?retryWrites=true&w=majority"
  );

  const db = client.db();

  const userpostsCollection = db.collection("user-posts");

  const userpostsList = await userpostsCollection
    .find({}, { _id: 1 })
    .toArray();

  client.close();
  return {
    fallback: "blocking",
    paths: userpostsList.map((post) => ({
      params: {
        postId: post._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const postId = context.params.postId;

  const client = await MongoClient.connect(
    "mongodb+srv://shaner:X1FFY8qVQ5yYi3AE@cluster0.vxyoc.mongodb.net/user-posts?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("user-posts");

  const selectedPost = await meetupsCollection.findOne(
    { _id: ObjectId(postId) },
    {}
  );

  client.close();

  return {
    props: {
      userposts: {
        id: selectedPost._id.toString(),
        //username: post.username
        postText: selectedPost.postText,
        dateAdded: selectedPost.dateAdded,
      },
    },
  };
}

export default PostThreadView;
