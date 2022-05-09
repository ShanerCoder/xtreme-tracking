import DarkerDiv from "../ui/DarkerDiv";
import LighterDiv from "../ui/LighterDiv";
import Card from "../ui/Card";
import classes from "./SocialForm.module.css";
import UserPost from "../form-components/SocialPage/UserPost";
import NewPost from "../form-components/SocialPage/NewPost";

function SocialForm(props) {
  return (
    <>
      <DarkerDiv>
        {props.user.authenticated ? (
          <NewPost
            onAddPost={props.onAddPost}
            currentUser={props.user.username}
          />
        ) : (
          <h3 className="center">Create a Free Account to create new posts!</h3>
        )}
      </DarkerDiv>

      <LighterDiv>
        <h2 className="center">User Posts</h2>
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
