import classes from "./UserPost.module.css";
import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";
import UserIcon from "../../ui/UserIcon";
import { useState } from "react";
import { useLoadingStore } from "../../../context/loadingScreen";

function PostDetails(props) {
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  const router = useRouter();
  const emptyHeartImageSource = "/icons/emptyHeart.png";
  const filledHeartImageSource = "/icons/filledHeart.png";
  const [liked, setLiked] = useState(props.postLikedByUser ? true : false);
  const [imageSource, setImageSource] = useState(
    liked ? filledHeartImageSource : emptyHeartImageSource
  );

  async function handleLoader(URL) {
    showLoadingScreen({ type: true });
    await router.push(URL);
    showLoadingScreen({ type: false });
  }

  function handleClick() {
    const likePost = imageSource == emptyHeartImageSource;
    const postData = {
      postId: props.id,
      likePost: likePost,
    };
    likePost
      ? setImageSource(filledHeartImageSource)
      : setImageSource(emptyHeartImageSource);

    props.handleLike(postData);
  }

  function obtainLikedByString() {
    let likedByString = "Liked By: ";
    const numberOfLikes = props.postLikedByUser
      ? props.numberOfLikes - 1
      : props.numberOfLikes;
    if (imageSource == filledHeartImageSource) {
      likedByString += "You ";
    }
    if (imageSource == filledHeartImageSource && numberOfLikes > 0)
      likedByString += " and ";
    if (numberOfLikes > 0) {
      likedByString += numberOfLikes + " other user";
      if (numberOfLikes > 1) likedByString += "s";
    }
    if (!(imageSource == filledHeartImageSource || numberOfLikes > 0)) {
      likedByString += "No users";
    }
    return <p>{likedByString}</p>;
  }

  return (
    <div>
      <h2 className={classes.postByInfo}>
        {props.title}
        <label
          className="linkLabel"
          onClick={() => {
            handleLoader("/userProfile/" + props.username);
          }}
          href={"/userProfile/" + props.username}
        >
          {props.username}
        </label>
      </h2>
      <p className={classes.dateTime}>{props.dateAdded}</p>
      <div>
        <Row>
          <Col xs={3} sm={1}>
            <div className={classes.profilePicture}>
              <UserIcon username={props.username} />
            </div>
          </Col>
          <Col xs={8} sm={11} className={classes.postPadding}>
            <Row>
              <Col xs={12}>
                <div className={classes.postBubble}>{props.postText}</div>
              </Col>
            </Row>
            {!props.comment && (
              <Row>
                <Col xs={10} lg={4}>
                  <Row>
                    <Col xs={12}>{obtainLikedByString()}</Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      {"Number of Comments: " + props.numberOfComments}
                    </Col>
                  </Row>
                </Col>

                <Col xs={1} lg={{ span: 1, offset: 7 }}>
                  {props.handleLike && (
                    <div className={classes.iconDiv}>
                      <img
                        className={classes.icon}
                        src={imageSource}
                        onClick={() => {
                          setLiked((liked) => !liked);
                          handleClick();
                        }}
                      />
                    </div>
                  )}
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default PostDetails;
