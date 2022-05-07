import PostDetails from "../../components/form-components/SocialPage/PostDetails";
import { dbConnect } from "../../lib/db-connect";
import classes from "../PageStyling.module.css";
import Post from "../../models/post";

function PostThreadView(props) {
  return (
    <>
      <PostDetails
        key={props.userposts.id}
        id={props.userposts.id}
        username={props.userposts.username}
        postText={props.userposts.postText}
        dateAdded={props.userposts.dateAdded}
      />
      <h2 className={classes.padding_top}>No Comments Added</h2>
    </>
  );
}

export async function getStaticPaths() {
  await dbConnect();
  let post = Post.find();
  const filter = {};
  const userpostsList = await post.find(filter).select("_id");

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

  await dbConnect();

  const filter = { _id: postId };
  console.log(postId);
  const selectedPost = await Post.findOne(filter);
  console.log(selectedPost.id);
  return {
    props: {
      userposts: {
        id: selectedPost._id.toString(),
        username: selectedPost.username,
        postText: selectedPost.postText,
        dateAdded: selectedPost.createdAt.toString(),
      },
    },
  };
}
export default PostThreadView;
