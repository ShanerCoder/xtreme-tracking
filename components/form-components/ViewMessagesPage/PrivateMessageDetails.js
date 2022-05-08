import classes from "./PrivateMessage.module.css";
import Link from "next/link";

function PostDetails(props) {
  function showDetailsHandler() {}

  return (
    <div>
      <p className={classes.dateTime}>{props.dateAdded}</p>
      <h2>
        Post By:{" "}
        <Link href={"/userProfile/" + props.username}>{props.username}</Link>
      </h2>
      <div className={classes.postBubble}>{props.postText}</div>
    </div>
  );
}

export default PostDetails;
