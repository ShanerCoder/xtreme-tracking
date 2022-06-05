import DarkerDiv from "../ui/DarkerDiv";
import LighterDiv from "../ui/LighterDiv";
import UserPost from "../form-components/SocialPage/UserPost";
import NewPost from "../form-components/Common/NewPost";

function SocialForm(props) {
  return (
    <>
      <DarkerDiv>
        {props.user.authenticated ? (
          <NewPost
            onAddPost={props.onAddPost}
            currentUser={props.user.username}
            title="Create a New Post:"
          />
        ) : (
          <h3 className="center">Create a Free Account to create new posts!</h3>
        )}
      </DarkerDiv>

      <LighterDiv>
        <h2 className="center">User Posts</h2>
        <ul className="list">
          {props.userposts.map((post) => (
            <UserPost
              key={post.id}
              id={post.id}
              username={post.username}
              postText={post.postText}
              dateAdded={post.dateAdded}
              postLikedByUser={post.postLikedByUser}
              numberOfLikes={post.numberOfLikes}
              handleLike={props.user.authenticated ? (props.handleLike) : (null)}
              numberOfComments={post.numberOfComments}
              title={"Post By: "}
            />
          ))}
        </ul>
      </LighterDiv>
    </>
  );
}

export default SocialForm;
