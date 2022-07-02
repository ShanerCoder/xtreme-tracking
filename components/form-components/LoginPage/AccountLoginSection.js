import classes from "./AccountLoginSection.module.css";
import { useRef } from "react";
import { useLoadingStore } from "../../../context/loadingScreen";
import { useRouter } from "next/router";

function AccountLoginSection(props) {
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  const router = useRouter();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  async function handleLoader(URL) {
    showLoadingScreen({ type: true });
    await router.push(URL);
    showLoadingScreen({ type: false });
  }

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
    <div className={classes.divFormatting}>
      <div className={classes.noAccountFormatting}>
        <p>Don't have an account?</p>
        <label
          className="linkLabel"
          onClick={() => {
            handleLoader("/register");
          }}
        >
          Register Here
        </label>
      </div>
      <form
        className={"form " + classes.formFormatting}
        onSubmit={handleSubmit}
      >
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
            ref={passwordInputRef}
            className={classes.inputFormatting}
          />
        </div>
        <div className="actions">
          <button className={classes.buttonFormatting}>LOG IN</button>
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

      <div className="center url">
        <label
          className="linkLabel"
          onClick={() => {
            handleLoader("/forgotPassword");
          }}
        >
          Forgot Password?
        </label>
      </div>
    </div>
  );
}

export default AccountLoginSection;
