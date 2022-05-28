import { useRef } from "react";
import Card from "../../../ui/Card";

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
        <div className="control">
          <label htmlFor="title">Email</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email"
            ref={emailInputRef}
          />
        </div>
        <div className="actions">
          <button>Submit Forgot Password</button>
        </div>
      </form>
    </Card>
  );
}

export default ForgotPasswordForm;
