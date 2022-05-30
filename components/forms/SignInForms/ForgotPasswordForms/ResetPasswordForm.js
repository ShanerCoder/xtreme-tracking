import Card from "../../../ui/Card";
import { useRef } from "react";

function ForgotPasswordForm() {
  const newPasswordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  function handleNewPasswordSubmit(event) {
    event.preventDefault();

    const newPassword = newPasswordInputRef.current.value;
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
        <form className="form" onSubmit={handleNewPasswordSubmit}>
          <div className="control">
            <label htmlFor="title">New Password</label>
            <input
              type="password"
              required
              id="password"
              placeholder="Password"
              ref={newPasswordInputRef}
            />
          </div>
          <div className="control">
            <label htmlFor="address">Confirm New Password</label>
            <input
              type="password"
              required
              id="confirmPassword"
              placeholder="Confirm Password"
              ref={confirmPasswordInputRef}
            />
          </div>
          <div className="actions">
            <button>Reset Password</button>
          </div>
        </form>
      </Card>
    </>
  );
}

export default ForgotPasswordForm;
