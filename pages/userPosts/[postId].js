import Head from "next/head";
import PostDetails from "../../components/form-components/SocialPage/PostDetails";
import { dbConnect } from "../../lib/db-connect";
import classes from "../PageStyling.module.css";
import Post from "../../models/post";
import PostLikedBy from "../../models/postLikedBy";
import PostComment from "../../models/postComment";
import mongoose from "mongoose";
import { getSession } from "next-auth/client";
import LighterDiv from "../../components/ui/LighterDiv";
import NewPost from "../../components/form-components/Common/NewPost";
import { useStore } from "../../context";
import { getValue } from "../../utils/common";
import UserPost from "../../components/form-components/SocialPage/UserPost";
import { useRouter } from "next/router";
import DarkerDiv from "../../components/ui/DarkerDiv";

function PostThreadView(props) {
  const router = useRouter();
  const [state] = useStore();
  const user = getValue(state, ["user"], null);

  async function handleAddComment(postData) {
    const bodyData = {
      postId: props.userposts.id,
      username: postData.username,
      commentText: postData.postText,
    };
    const response = await fetch("/api/social/user_comments", {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: { "Content-Type": "application/json" },
    });
    await response.json();
    router.push("/userPosts/" + props.userposts.id);
  }

  return (
    <>
      <Head>
        <title>Post Thread</title>
        <meta
          name="Xtreme Tracking Post Thread"
          content="Browse a post's thread here!"
        />
      </Head>
      <LighterDiv>
        <PostDetails
          key={props.userposts.id}
          id={props.userposts.id}
          username={props.userposts.username}
          postText={props.userposts.postText}
          dateAdded={props.userposts.dateAdded}
          postLikedByUser={props.userposts.postLikedByUser}
          numberOfLikes={props.userposts.numberOfLikes}
          numberOfComments={props.userposts.numberOfComments}
          title="Post By: "
        />
      </LighterDiv>
      <DarkerDiv>
        {user.authenticated ? (
          <NewPost
            title="Add a new Comment:"
            currentUser={user.username}
            onAddPost={handleAddComment}
          />
        ) : (
          <h3 className="center">Create a Free Account to add a comment!</h3>
        )}
      </DarkerDiv>
      <LighterDiv>
        {props.usercomments.length ? (
          <ul className="list">
            {props.usercomments.map((comment) => (
              <UserPost
                key={comment.id}
                id={comment.id}
                username={comment.username}
                postText={comment.commentText}
                dateAdded={comment.dateAdded}
                comment={true}
                title={"Comment By: "}
              />
            ))}
          </ul>
        ) : (
          <h2 className={classes.padding_top}>No Comments Added</h2>
        )}
      </LighterDiv>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const postId = context.query.postId;

    await dbConnect();

    const req = context.req;
    const session = await getSession({ req });

    const comments = await PostComment.find({
      postId: mongoose.Types.ObjectId(postId),
    }).sort({_id: -1});

    const numberOfLikes = await PostLikedBy.find({
      postId: mongoose.Types.ObjectId(postId),
    }).count();

    const numberOfComments = await PostComment.find({
      postId: mongoose.Types.ObjectId(postId),
    }).count();

    let postLiked;
    if (session)
      postLiked = await PostLikedBy.find({
        postId: mongoose.Types.ObjectId(postId),
        usernameLikingPost: session.user.username,
      }).count();

    const filter = { _id: postId };
    const selectedPost = await Post.findOne(filter);
    return {
      props: {
        userposts: {
          id: selectedPost._id.toString(),
          username: selectedPost.username,
          postText: selectedPost.postText,
          dateAdded: selectedPost.createdAt.toString(),
          postLikedByUser: postLiked ? true : false,
          numberOfLikes: numberOfLikes,
          numberOfComments: numberOfComments,
        },
        usercomments: comments.map((comment) => ({
          id: comment._id.toString(),
          username: comment.username,
          commentText: comment.commentText,
          dateAdded: comment.createdAt.toString(),
        })),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
export default PostThreadView;
