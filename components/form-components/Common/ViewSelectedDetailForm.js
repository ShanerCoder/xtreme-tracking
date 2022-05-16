import classes from "./ViewSelectedDetailForm.module.css";
import { Col, Row } from "react-bootstrap";
import { useState } from "react";

function ViewMessagesForm(props) {
  return (
    <>
      <p>
        {props.usernameFrom} - {props.dateCreated}
      </p>
      <div className={classes.messageBubble}>{props.detailText}</div>
      <div>
        <Row className={classes.messageButtonsSection}>
          <Col xs="4">
            <button onClick={props.handleOptionOne}>
              {props.optionOneText}
            </button>
          </Col>
          <Col xs={{ span: 4, offset: 4 }}>
            <button onClick={props.handleOptionTwo}>
              {props.optionTwoText}
            </button>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ViewMessagesForm;
