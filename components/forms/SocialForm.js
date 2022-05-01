import DarkerDiv from "../ui/DarkerDiv";
import LighterDiv from "../ui/LighterDiv";
import { useRef } from "react";
import Card from "../ui/Card";
import classes from "./SocialForm.module.css";
import UserPost from "../form-components/SocialPage/UserPost";

function MeetupList(props) {
  const postTextRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    const enteredPostText = postTextRef.current.value;
    //const currentUser = username.value;

    const postData = {
      //username: currentUser,
      postText: enteredPostText,
    };

    props.onAddPost(postData);
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
        <ul className={classes.list}>
          {props.userposts.map((post) => (
            <UserPost
              key={post.id}
              id={post.id}
              //username={post.username}
              postText={post.postText}
              dateAdded={post.dateAdded}
            />
          ))}
        </ul>
      </LighterDiv>
    </>
  );
}

export default MeetupList;
