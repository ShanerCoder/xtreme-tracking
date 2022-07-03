import { useRef } from "react";
import classes from "./ResetPasswordSection.module.css";
import { useLoadingStore } from "../../../context/loadingScreen";
import { useRouter } from "next/router";

function ResetPasswordSection(props) {
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  const router = useRouter();
  const emailInputRef = useRef();
  const newPasswordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  async function handleLoader(URL) {
    showLoadingScreen({ type: true });
    await router.push(URL);
    showLoadingScreen({ type: false });
  }

  function handleSubmit(event) {
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
    <div className={classes.divFormatting}>
      <div className={classes.labelFormatting}>
        <p>Enter in your New Password!</p>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <input
            type="password"
            required
            id="newPassword"
            placeholder="New Password"
            ref={newPasswordInputRef}
            className={classes.inputFormatting}
          />
        </div>
        <div>
          <input
            type="password"
            required
            id="confirmPassword"
            placeholder="Confirm Password"
            ref={confirmPasswordInputRef}
            className={classes.inputFormatting}
          />
        </div>
        <div>
          <button className={classes.buttonFormatting}>CHANGE PASSWORD</button>
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

export default ResetPasswordSection;
