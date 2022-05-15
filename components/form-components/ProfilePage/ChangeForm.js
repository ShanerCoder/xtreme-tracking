import Card from "../../ui/Card";
import classes from "./ChangeForm.module.css";
import { useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";

function ChangeForm(props) {
  const currentValueRef = useRef();
  const newValueRef = useRef();
  const confirmNewValueRef = useRef();
  const [errorMessage, setErrorMessage] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    const enteredCurrentValue = currentValueRef.current.value;
    const enteredNewValue = newValueRef.current.value;
    const enteredConfirmNewValue = confirmNewValueRef.current.value;
    if (enteredNewValue != enteredConfirmNewValue) {
      setErrorMessage("Both fields do not match!");
    } else if (enteredNewValue == enteredCurrentValue) {
      setErrorMessage("The current and new values are the same!");
    } else {
      setErrorMessage(null);
      const newValueSubmission = {
        newValue: enteredNewValue,
        currentValue: enteredCurrentValue,
      };
      props.onSubmit(newValueSubmission);
    }
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={handleSubmit}>
        <h2 className="center">Change your {props.newValueType}</h2>
        <div className={classes.control}>
          <label htmlFor={props.newValueType}>
            Current {props.newValueType}
          </label>
          <input
            type={props.newValueType}
            required
            id={props.newValueType}
            placeholder={"Current " + props.newValueType}
            ref={currentValueRef}
          />

          <label htmlFor={props.newValueType}>New {props.newValueType}</label>
          <input
            type={props.newValueType}
            required
            id={props.newValueType}
            placeholder={"New " + props.newValueType}
            ref={newValueRef}
          />

          <label htmlFor={"confirm" + props.newValueType}>
            Confirm New {props.newValueType}
          </label>
          <input
            type={props.newValueType}
            required
            id={"confirm" + props.newValueType}
            placeholder={"Confirm New " + props.newValueType}
            ref={confirmNewValueRef}
          />
        </div>
        <Row className={classes.actions}>
          <Col sm={6}>
            {errorMessage && (
              <p style={{ textTransform: "capitalize", color: "red" }}>
                {errorMessage}
              </p>
            )}
          </Col>
          <Col sm={6}>
            <button style={{ float: "right" }}>
              Change {props.newValueType}
            </button>
          </Col>
        </Row>
      </form>
    </Card>
  );
}

export default ChangeForm;
