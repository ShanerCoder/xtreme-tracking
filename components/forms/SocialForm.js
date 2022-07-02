import DarkerDiv from "../ui/DarkerDiv";
import LighterDiv from "../ui/LighterDiv";
import UserPost from "../form-components/SocialPage/UserPost";
import NewPost from "../form-components/Common/NewPost";
import NewsArticle from "../form-components/SocialPage/NewsArticle";
import { useRef } from "react";

function SocialForm(props) {
  const updatePostTextFunction = useRef(null);

  function handleShare(postData) {
    const postText =
      postData.content +
      (postData.id ? "http://" + props.host + "/userPosts/" + postData.id : "");
    updatePostTextFunction.current(postText);
    console.log(postData.content);
  }

  return (
    <>
      <DarkerDiv>
        {props.user.authenticated ? (
          <NewPost
            onAddPost={props.onAddPost}
            currentUser={props.user.username}
            title="Create a New Post:"
            updatePostTextFunction={updatePostTextFunction}
          />
        ) : (
          <h3 className="center">Create a Free Account to create new posts!</h3>
        )}
      </DarkerDiv>

      <LighterDiv>
        {props.article ? (
          <>
            <p style={{ fontSize: "20px" }}>Featured News</p>
            <NewsArticle
              article={props.article}
              shareArticle={props.user.authenticated ? handleShare : null}
            />
          </>
        ) : (
          <h1>No Article Available</h1>
        )}
      </LighterDiv>
      <DarkerDiv>
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
              handleLike={props.user.authenticated ? props.handleLike : null}
              numberOfComments={post.numberOfComments}
              sharePost={props.user.authenticated ? handleShare : null}
              title={"Post By: "}
            />
          ))}
        </ul>
      </DarkerDiv>
    </>
  );
}

export default SocialForm;
