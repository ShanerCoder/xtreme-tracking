import PostDetails from "./PostDetails";
import { useRouter } from "next/router";
import classes from "./UserPost.module.css";
import { useLoadingStore } from "../../../context/loadingScreen";
import { Col, Row } from "react-bootstrap";

function UserPost(props) {
  const router = useRouter();
  const [loadingScreen, showLoadingScreen] = useLoadingStore();

  async function viewThreadHandler() {
    showLoadingScreen({ type: true });
    await router.push("userPosts/" + props.id);
    showLoadingScreen({ type: false });
  }

  // Function that updates the postText field
  function sharePostHandler() {
    const postData = {
      id: props.id,
      content: "Check out this post by " + props.username + ": ",
    };
    props.sharePost(postData);
    window.scrollTo({
      top: 300,
      behavior: "smooth",
    });
  }

  return (
    <div style={{ paddingBottom: "20px" }}>
      <PostDetails
        id={props.id}
        username={props.username}
        postText={props.postText}
        dateAdded={props.dateAdded}
        handleLike={props.handleLike}
        postLikedByUser={props.postLikedByUser}
        numberOfLikes={props.numberOfLikes}
        numberOfComments={props.numberOfComments}
        title={props.title}
        comment={props.comment}
      />
      {!props.comment && (
        <div className={classes.actions}>
          <Row>
            <Col xs={12} lg={props.sharePost ? 8 : 12}>
              <button
                onClick={viewThreadHandler}
                className={classes.viewThreadButton}
              >
                View Thread
              </button>
            </Col>
            {props.sharePost && (
              <Col xs={12} lg={4}>
                <button
                  onClick={sharePostHandler}
                  className={classes.viewThreadButton}
                >
                  Share Post
                </button>
              </Col>
            )}
          </Row>
        </div>
      )}
    </div>
  );
}

export default UserPost;
