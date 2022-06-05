import { useRef } from "react";
import Form from "react-bootstrap/Form";
import classes from "./AccountCreationSection.module.css";
import { useLoadingStore } from "../../../context/loadingScreen";
import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";

function AccountCreationSection(props) {
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  const router = useRouter();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const emailInputRef = useRef();
  const forenameInputRef = useRef();
  const surnameInputRef = useRef();
  const PTUserRef = useRef();

  async function handleLoader(URL) {
    showLoadingScreen({ type: true });
    await router.push(URL);
    showLoadingScreen({ type: false });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredForename = forenameInputRef.current.value;
    const enteredSurname = surnameInputRef.current.value;
    const ptUser = PTUserRef.current.checked;

    const newUserData = {
      username: enteredUsername,
      password: enteredPassword,
      email: enteredEmail,
      forename: enteredForename,
      surname: enteredSurname,
      personalTrainerProfile: ptUser,
    };

    props.onSubmit(newUserData);
  }

  return (
    <div className={classes.divFormatting}>
      <div className={classes.alreadyAnAccountFormatting}>
        <p>Already have an account?</p>
        <label
          className="linkLabel"
          onClick={() => {
            handleLoader("/login");
          }}
        >
          Log In
        </label>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            required
            id="title"
            placeholder="Username"
            maxLength="20"
            ref={usernameInputRef}
            className={classes.inputFormatting}
          />
        </div>
        <div>
          <input
            type="password"
            required
            id="address"
            placeholder="Password"
            maxLength="40"
            ref={passwordInputRef}
            className={classes.inputFormatting}
          />
        </div>
        <div>
          <input
            type="email"
            required
            id="title"
            placeholder="Email"
            maxLength="100"
            ref={emailInputRef}
            className={classes.inputFormatting}
          />
        </div>
        <div>
          <input
            type="text"
            required
            id="title"
            placeholder="Forename"
            maxLength="25"
            ref={forenameInputRef}
            className={classes.inputFormatting}
          />
          <input
            type="text"
            required
            id="title"
            placeholder="Surname"
            maxLength="25"
            ref={surnameInputRef}
            className={classes.inputFormatting}
          />
        </div>
        <div className="center">
          <p>Client or Personal Trainer?</p>

          <div className="mb-3">
            <Row>
              <Col xs={6}>
                <Form.Check
                  inline
                  label="Client"
                  name="group1"
                  type="radio"
                  id={`inline-radio-1`}
                  required
                  className={classes.radioButtonFormatting}
                />
              </Col>
              <Col xs={6}>
                <Form.Check
                  inline
                  label="Personal Trainer"
                  name="group1"
                  type="radio"
                  id={`inline-radio-2`}
                  ref={PTUserRef}
                  required
                  className={classes.radioButtonFormatting}
                />
              </Col>
            </Row>
          </div>
          <div>
            <p>This can be changed later</p>
          </div>
        </div>
        <div>
          <button className={classes.buttonFormatting}>JOIN US</button>
        </div>
        <div className={classes.additionalInfoFormatting}>
          <p>By continuing, you agree to accept our</p>
          <p>
            <a href="https://www.freeprivacypolicy.com/live/f33142ea-0bc6-45ef-b52d-19461f987c30">
              Privacy Policy
            </a>
            {" & "}
            <a href="https://www.termsofservicegenerator.net/live.php?token=heRwu89mQUAI7OIijS4gXw1PGUQHloWP">
              Terms of Service
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default AccountCreationSection;
