import PostDetails from "./PostDetails";
import { useRouter } from "next/router";

function UserPost(props) {
  const router = useRouter();

  /*function viewThreadHandler() {
    router.push("userPosts/" + props.id);
  }*/

  return (
    <div>
      <PostDetails
        username={props.username}
        postText={props.postText}
        dateAdded={props.dateAdded}
      />
      {/*<div className="actions">
        <button onClick={viewThreadHandler}>View Thread</button>
  </div>*/}
    </div>
  );
}

export default UserPost;
