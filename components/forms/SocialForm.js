import Card from "../ui/Card";
import classes from "./SocialForm.module.css";
import LighterDiv from "../ui/LighterDiv";
import DarkerDiv from "../ui/DarkerDiv";
import UserPosts from "../form-components/SocialPage/UserPost";
import { useRef } from "react";

function SocialForm(props) {
  const postTextRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    const enteredPostText = postTextRef.current.value;

    postTextRef.current.value = "";
  }

  return (
    <>
      <DarkerDiv>
        <p>Create a New Post:</p>
        <Card>
          <div className={classes.control}>
            <textarea id="description" required rows="5" ref={postTextRef} />
          </div>
        </Card>
        <div className={classes.actions}>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </DarkerDiv>
      <LighterDiv>
        <h3>Other User Posts</h3>
        {/* {postsList.map((post) => {
          return (
            <UserPosts
              key={post.postId}
              postText={post.postText}
              postDate={post.postDate}
              postTime={post.postTime}
            />
          );
        })} */}
      </LighterDiv>
    </>
  );
}

export default SocialForm;
