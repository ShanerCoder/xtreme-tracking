import Card from "../../ui/Card";
import classes from "./UserPost.module.css";

function UserPost(props) {
  return (
    <div>
      <p className={classes.dateTime}>
        {
          //props.postDate} at {props.postTime}
        }
        {props.dateAdded}
      </p>
      <div className={classes.postBubble}>{props.postText}</div>
    </div>
  );
}

export default UserPost;
