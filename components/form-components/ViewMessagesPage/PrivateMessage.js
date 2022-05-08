import PostDetails from "./PrivateMessageDetails";
import classes from "./PrivateMessage.module.css";
import { useRouter } from "next/router";

function UserPost(props) {
  const router = useRouter();

  function viewThreadHandler() {
    router.push("/userPosts/" + props.id);
  }

  return (
    <div>
      <PostDetails
        //posterId={props.posterId}
        username={props.username}
        postText={props.postText}
        dateAdded={props.dateAdded}
      />
      <div className={classes.actions}>
        <button onClick={viewThreadHandler}>View Thread</button>
      </div>
    </div>
  );
}

export default UserPost;
