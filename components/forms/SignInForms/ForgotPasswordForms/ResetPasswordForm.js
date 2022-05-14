import Card from "../../../ui/Card";
import classes from "./ResetPasswordForm.module.css";
import { useRef } from "react";

function ForgotPasswordForm(props) {
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const newPassword = passwordInputRef.current.value;
    const confirmNewPassword = confirmPasswordInputRef.current.value;
    if (newPassword != confirmNewPassword) {
      props.setErrorMessage("Both fields do not match!");
    } else {
      props.setErrorMessage(null);
      props.onSubmit(newPassword);
    }
  }

  return (
    <>
      <Card>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.control}>
            <label htmlFor="title">New Password</label>
            <input
              type="password"
              required
              id="password"
              placeholder="Password"
              ref={passwordInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="address">Confirm New Password</label>
            <input
              type="password"
              required
              id="confirmPassword"
              placeholder="Confirm Password"
              ref={confirmPasswordInputRef}
            />
          </div>
          <div className={classes.actions}>
            <button>Reset Password</button>
          </div>
        </form>
      </Card>
    </>
  );
}

export default ForgotPasswordForm;
