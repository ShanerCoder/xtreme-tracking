import PostDetails from "./PostDetails";
import { useRouter } from "next/router";
import classes from "./UserPost.module.css";

function UserPost(props) {
  const router = useRouter();

  function viewThreadHandler() {
    router.push("userPosts/" + props.id);
  }

  return (
    <div style={{ paddingBottom: "20px" }}>
      <PostDetails
        id={props.id}
        username={props.username}
        postText={props.postText}
        dateAdded={props.dateAdded}
        handleLike={props.handleLike}
        postLikedByUser={props.postLikedByUser}
        numberOfLikes={props.numberOfLikes}
        numberOfComments={props.numberOfComments}
        title={props.title}
        comment={props.comment}
      />
      {!props.comment && (
        <div className={classes.actions}>
          <button
            onClick={viewThreadHandler}
            className={classes.viewThreadButton}
          >
            View Thread
          </button>
        </div>
      )}
    </div>
  );
}

export default UserPost;
