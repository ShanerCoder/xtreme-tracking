import { useRef } from "react";
import Card from "../../../ui/Card";
import classes from "./ForgotPasswordForm.module.css";

function ForgotPasswordForm(props) {
  const emailInputRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const emailValue = emailInputRef.current.value;
    props.onSubmit(emailValue);
  }

  return (
    <Card>
      <form className="form" onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor="title">Email</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email"
            ref={emailInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>Submit Forgot Password</button>
        </div>
      </form>
    </Card>
  );
}

export default ForgotPasswordForm;
