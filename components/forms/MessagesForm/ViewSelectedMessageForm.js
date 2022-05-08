import classes from "./ViewSelectedMessageForm.module.css";
import { Col, Row } from "react-bootstrap";
import { useState } from "react";

function ViewMessagesForm(props) {
  let confirmDelete = false;
  const [deleteButtonText, setDeleteButtonText] = useState(
    "Permanently Delete This Message"
  );

  function handleDeleteButton() {
    if (!confirmDelete) {
      confirmDelete = true;
      setDeleteButtonText("Click twice to confirm deletion of this message.");
    } else {
      props.handleDelete();
    }
  }

  const message = props.privateMessage;
  return (
    <>
      <p>
        {message.usernameFrom} - {message.dateCreated}
      </p>
      <div className={classes.messageBubble}>{message.privateMessage}</div>
      <div>
        <Row className={classes.messageButtonsSection}>
          <Col xs="4">
            <button onClick={props.handleWriteResponse}>Write Response</button>
          </Col>
          <Col xs={{ span: 4, offset: 4 }}>
            <button onClick={handleDeleteButton}>{deleteButtonText}</button>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ViewMessagesForm;
