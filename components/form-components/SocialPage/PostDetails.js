import classes from "./UserPost.module.css";
import Link from "next/link";

function PostDetails(props) {
  return (
    <div>
      <h2 className={classes.postByInfo}>
        Post By:{" "}
        <Link href={"/userProfile/" + props.username}>{props.username}</Link>
      </h2>
      <p className={classes.dateTime}>{props.dateAdded}</p>
      <div className={classes.postBubble}>{props.postText}</div>
    </div>
  );
}

export default PostDetails;
