import Head from "next/head";
import PostDetails from "../../components/form-components/SocialPage/PostDetails";
import { dbConnect } from "../../lib/db-connect";
import classes from "../PageStyling.module.css";
import Post from "../../models/post";

function PostThreadView(props) {
  return (
    <>
      <Head>
        <title>Post Thread</title>
        <meta
          name="Xtreme Tracking Post Thread"
          content="Browse a post's thread here!"
        />
      </Head>
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

export async function getServerSideProps(context) {
  try {
    const postId = context.query.postId;

    await dbConnect();

    const filter = { _id: postId };
    const selectedPost = await Post.findOne(filter);
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
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
export default PostThreadView;
