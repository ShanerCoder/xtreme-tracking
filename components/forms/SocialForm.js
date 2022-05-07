import DarkerDiv from "../ui/DarkerDiv";
import LighterDiv from "../ui/LighterDiv";
import { useRef } from "react";
import Card from "../ui/Card";
import classes from "./SocialForm.module.css";
import UserPost from "../form-components/SocialPage/UserPost";
import { useStore } from "../../context";
import { getValue } from "../../utils/common";

function SocialForm(props) {
  const postTextRef = useRef();
  const [state, dispatch] = useStore();
  const user = getValue(state, ["user"], null);

  function handleSubmit(event) {
    event.preventDefault();
    const enteredPostText = postTextRef.current.value;
    const currentUser = user.username;

    const postData = {
      //posterId: user.id,
      username: currentUser,
      postText: enteredPostText,
    };

    props.onAddPost(postData);
    postTextRef.current.value = "";
  }

  return (
    <>
      <DarkerDiv>
        {user.authenticated ? (
          <>
            <p>Create a New Post:</p>
            <Card>
              <div className={classes.control}>
                <textarea
                  id="description"
                  required
                  rows="5"
                  ref={postTextRef}
                />
              </div>
            </Card>
            <div className={classes.actions}>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </>
        ) : (
          <h3 className="center">Create a Free Account to create new posts!</h3>
        )}
      </DarkerDiv>

      <LighterDiv>
        <h3>User Posts</h3>
        <ul className={classes.list}>
          {props.userposts.map((post) => (
            <UserPost
              key={post.id}
              id={post.id}
              username={post.username}
              //posterId={post.posterId}
              postText={post.postText}
              dateAdded={post.dateAdded}
            />
          ))}
        </ul>
      </LighterDiv>
    </>
  );
}

export default SocialForm;
