import { useEffect, useRef } from "react";
import Card from "../../ui/Card";

function NewPost(props) {

  // useEffect runs once upon the start of the file execution
  // Set to update the variable stored in the props to equal the functtion updatePostText stored in this file
  // This allows for the updatePostText function to be called from its parent
  useEffect(() => {
    if (props.updatePostTextFunction)
      props.updatePostTextFunction.current = updatePostText;
  }, []);

  const postTextRef = useRef();

  // Function that updates the post text field
  function updatePostText(textToAdd) {
    postTextRef.current.value = textToAdd;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const enteredPostText = postTextRef.current.value;

    if (enteredPostText != "") {
      const postData = {
        username: props.currentUser,
        postText: enteredPostText,
      };

      props.onAddPost(postData);
    }
    postTextRef.current.value = "";
  }

  return (
    <>
      <p style={{ fontSize: "20px" }}>{props.title}</p>
      <Card>
        <div className="control">
          <textarea
            id="description"
            required
            rows="5"
            maxLength={400}
            ref={postTextRef}
          />
        </div>
      </Card>
      <div className="actions">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
}

export default NewPost;
