import classes from "./UserPost.module.css";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import UserIcon from "../../ui/UserIcon";
import { useState } from "react";

function PostDetails(props) {
  const emptyHeartImageSource = "/icons/emptyHeart.png";
  const filledHeartImageSource = "/icons/filledHeart.png";
  const [liked, setLiked] = useState(props.postLikedByUser ? true : false);
  const [imageSource, setImageSource] = useState(
    liked ? filledHeartImageSource : emptyHeartImageSource
  );

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

  return (
    <div>
      <h2 className={classes.postByInfo}>
        Post By:{" "}
        <Link href={"/userProfile/" + props.username}>{props.username}</Link>
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
            {props.handleLike && (
              <Row>
                <Col lg={{ span: 1, offset: 11 }}>
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
