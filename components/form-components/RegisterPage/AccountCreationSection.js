import Card from "../../ui/Card";
import classes from "./AccountCreationSection.module.css";
import { useRef } from "react";
import Form from "react-bootstrap/Form";

function AccountCreationSection(props) {
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const emailInputRef = useRef();
  const forenameInputRef = useRef();
  const surnameInputRef = useRef();
  const PTUserRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredForename = forenameInputRef.current.value;
    const enteredSurname = surnameInputRef.current.value;
    //const ptUser = PTUserRef.current.checked;

    const newUserData = {
      username: enteredUsername,
      password: enteredPassword,
      email: enteredEmail,
      forename: enteredForename,
      surname: enteredSurname,
      //personalTrainerAccount: ptUser,
    };

    props.onSubmit(newUserData);
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
        <div className={classes.control}>
          <label htmlFor="title">Email</label>
          <input
            type="email"
            required
            id="title"
            placeholder="Email"
            ref={emailInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="title">Forename</label>
          <input
            type="text"
            required
            id="title"
            placeholder="Forename"
            ref={forenameInputRef}
          />
          <label htmlFor="title">Surname</label>
          <input
            type="text"
            required
            id="title"
            placeholder="Surname"
            ref={surnameInputRef}
          />
        </div>
        <div className="center">
          <p>Client or Personal Trainer?</p>

          <div className="mb-3">
            <Form.Check
              inline
              label="Client"
              name="group1"
              type="radio"
              id={`inline-radio-1`}
              required
            />
            <Form.Check
              inline
              label="Personal Trainer"
              name="group1"
              type="radio"
              id={`inline-radio-2`}
              ref={PTUserRef}
              required
            />
          </div>
          <div>
            <p>This can be changed later</p>
          </div>
        </div>
        <div className={classes.actions}>
          <button>JOIN US</button>
        </div>
      </form>
    </Card>
  );
}

export default AccountCreationSection;
