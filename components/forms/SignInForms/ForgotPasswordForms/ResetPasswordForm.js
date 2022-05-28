import Card from "../../../ui/Card";
import classes from "./ResetPasswordForm.module.css";
import { useRef } from "react";

function ForgotPasswordForm() {
  const currentPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const currentEmailInputRef = useRef();
  const newEmailInputRef = useRef();
  const confirmEmailInputRef = useRef();

  function handlePasswordSubmit(event) {
    event.preventDefault();

    const currentPassword = currentPasswordInputRef.current.value;
    const newPassword = newPasswordInputRef.current.value;
    const confirmNewPassword = confirmPasswordInputRef.current.value;
    if (newPassword != confirmNewPassword) {
      props.setErrorMessage("Both fields do not match!");
    } else {
      props.setErrorMessage(null);
      props.onSubmit(newPassword);
    }
  }

  function handleEmailSubmit(event) {
    event.preventDefault();

    const currentEmail = currentEmailInputRef.current.value;
    const newEmail = newEmailInputRef.current.value;
    const confirmNewEmail = confirmEmailInputRef.current.value;
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
        <form className="form" onSubmit={handleNewPasswordSubmit}>
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
