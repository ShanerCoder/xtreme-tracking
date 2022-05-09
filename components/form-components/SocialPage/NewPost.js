import classes from "./NewPost.module.css";
import { useRef } from "react";
import Card from "../../ui/Card";

function NewPost(props) {
  const postTextRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    const enteredPostText = postTextRef.current.value;

    if (enteredPostText != "") {
      const postData = {
        //posterId: user.id,
        username: props.currentUser,
        postText: enteredPostText,
      };

      props.onAddPost(postData);
    }
    postTextRef.current.value = "";
  }

  return (
    <>
      <p>Create a New Post:</p>
      <Card>
        <div className={classes.control}>
          <textarea
            id="description"
            required
            rows="5"
            maxLength={400}
            ref={postTextRef}
          />
        </div>
      </Card>
      <div className={classes.actions}>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
}

export default NewPost;
