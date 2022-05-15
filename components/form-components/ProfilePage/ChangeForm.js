import Card from "../../ui/Card";
import classes from "./ChangeForm.module.css";
import { useRef } from "react";

function ChangeEmailForm(props) {
  const currentValueRef = useRef();
  const newValueRef = useRef();
  const confirmNewValueRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const enteredCurrentValue = currentValueRef.current.value;
    const enteredNewValue = newValueRef.current.value;
    const enteredConfirmNewValue = confirmNewValueRef.current.value;
    if (enteredNewValue != enteredConfirmNewValue) {
      props.setErrorMessage("Both fields do not match!");
    } else {
      props.setErrorMessage(null);
      props.onSubmit(enteredNewValue);
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
            ref={newValueRef}
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
        <div className={classes.actions}>
          <button>Change {props.newValueType}</button>
        </div>
      </form>
    </Card>
  );
}

export default ChangeEmailForm;
