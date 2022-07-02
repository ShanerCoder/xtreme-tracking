import { useRef } from "react";
import classes from "./ForgotPasswordSection.module.css";
import { useLoadingStore } from "../../../context/loadingScreen";
import { useRouter } from "next/router";

function ForgotPasswordSection(props) {
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  const router = useRouter();
  const emailInputRef = useRef();

  async function handleLoader(URL) {
    showLoadingScreen({ type: true });
    await router.push(URL);
    showLoadingScreen({ type: false });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const emailValue = emailInputRef.current.value;
    props.onSubmit(emailValue);
  }

  return (
    <div className={classes.divFormatting}>
      <div className={classes.alreadyAnAccountFormatting}>
        <p>Remembered your details?</p>
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
            type="email"
            required
            id="title"
            placeholder="Email of your account"
            maxLength="100"
            ref={emailInputRef}
            className={classes.inputFormatting}
          />
        </div>
        <div>
          <button className={classes.buttonFormatting}>
            SEND RECOVERY EMAIL
          </button>
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

export default ForgotPasswordSection;
