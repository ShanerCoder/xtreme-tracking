import Card from "../../ui/Card";
import classes from "./AccountLoginSection.module.css";
import { useRef } from "react";

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
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor="title">Username</label>
          <input
            type="text"
            required
            id="title"
            placeholder="Username"
            ref={usernameInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Password</label>
          <input
            type="password"
            required
            id="address"
            placeholder="Password"
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>Sign In</button>
        </div>
      </form>
    </Card>
  );
}

export default AccountCreationSection;