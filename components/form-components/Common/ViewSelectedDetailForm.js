import classes from "./ViewSelectedDetailForm.module.css";
import { Col, Row } from "react-bootstrap";
import { useRef } from "react";

function ViewMessagesForm(props) {
  const additionalInfoRef = useRef();

  // Function to execute option one if selected
  function handleOptionOne() {
    if (props.additionalContext) {
      props.handleOptionOne(additionalInfoRef.current.value);
      additionalInfoRef.current.value = null;
    } else props.handleOptionOne();
  }

  // Function to execute option two if selected
  function handleOptionTwo() {
    if (props.additionalContext) {
      props.handleOptionTwo(additionalInfoRef.current.value);
      additionalInfoRef.current.value = null;
    } else props.handleOptionTwo();
  }

  return (
    <>
      <p>
        {props.usernameFrom} - {props.dateCreated}
      </p>
      <div className={classes.messageBubble}>{props.detailText}</div>
      {props.additionalContext && (
        <Row className={classes.additionalContextSection}>
          <p>Provide Additional Info into your decision:</p>
          <div className="control">
            <textarea
              rows="5"
              required
              id="message"
              placeholder="Additional Context"
              maxLength="400"
              ref={additionalInfoRef}
            />
          </div>
        </Row>
      )}
      <Row className={classes.messageButtonsSection}>
        <Col className={classes.columnPadding} sm="5">
          <button onClick={handleOptionOne}>{props.optionOneText}</button>
        </Col>
        <Col sm={{ span: 5, offset: 2 }}>
          <button onClick={handleOptionTwo}>{props.optionTwoText}</button>
        </Col>
      </Row>
    </>
  );
}

export default ViewMessagesForm;
