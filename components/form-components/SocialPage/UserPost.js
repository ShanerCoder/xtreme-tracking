import PostDetails from "./PostDetails";
import classes from "./UserPost.module.css";
import { useRouter } from "next/router";

function UserPost(props) {
  const router = useRouter();

  function viewThreadHandler() {
    router.push("/" + props.id);
  }

  return (
    <div>
      <PostDetails postText={props.postText} dateAdded={props.dateAdded} />
      <div className={classes.actions}>
        <button onClick={viewThreadHandler}>View Thread</button>
      </div>
    </div>
  );
}

export default UserPost;
