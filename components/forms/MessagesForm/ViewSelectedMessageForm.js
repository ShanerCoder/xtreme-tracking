import classes from "./ViewSelectedMessageForm.module.css";
import { Col, Row } from "react-bootstrap";

function ViewMessagesForm(props) {
  console.log(props);
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
            <button>Write Response</button>
          </Col>
          <Col xs={{ span: 4, offset: 4 }}>
            <button>Delete Message</button>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ViewMessagesForm;
