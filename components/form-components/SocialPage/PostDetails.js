import classes from "./UserPost.module.css";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import UserIcon from "../../ui/UserIcon";
import React from "react";

function PostDetails(props) {
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
            <div className={classes.postBubble}>{props.postText}</div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default PostDetails;
