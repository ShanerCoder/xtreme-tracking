import Card from "../../ui/Card";
import { useRef } from "react";
import Link from "next/link";

function AccountCreationSection(props) {
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const existingUserData = {
      username: enteredUsername,
      password: enteredPassword,
    };

    props.onSubmit(existingUserData);
  }

  return (
    <Card>
      <form className="form" onSubmit={handleSubmit}>
        <div className="control">
          <label htmlFor="title">Username</label>
          <input
            type="text"
            required
            id="title"
            placeholder="Username"
            maxLength="20"
            ref={usernameInputRef}
          />
        </div>
        <div className="control">
          <label htmlFor="address">Password</label>
          <input
            type="password"
            required
            id="address"
            placeholder="Password"
            ref={passwordInputRef}
          />
        </div>
        <div className="actions">
          <button>Sign In</button>
        </div>
      </form>
      <Link href="/forgotPassword">
        <div className="center url">
          <Link className="link" href="/forgotPassword">
            Forgot Password?
          </Link>
        </div>
      </Link>
    </Card>
  );
}

export default AccountCreationSection;
