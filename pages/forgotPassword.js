import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { useStore } from "../context";
import { getValue } from "../utils/common";
import ForgotPasswordForm from "../components/forms/SignInForms/ForgotPasswordForms/ForgotPasswordForm";
import { useLoadingStore } from "../context/loadingScreen";
import LighterDiv from "../components/ui/LighterDiv";

function ForgotPasswordPage() {
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const router = useRouter();
  const [state] = useStore();
  const user = getValue(state, ["user"], null);

  async function forgotPasswordSubmitHandler(email) {
    showLoadingScreen({ type: true });
    const response = await fetch("/api/account/passwords/forgot_password", {
      method: "POST",
      body: JSON.stringify(email),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
      setSuccessMessage(null);
    } else {
      setErrorMessage(null);
      setSuccessMessage(
        "Email sent! Please check your emails to reset your password. This may appear in the junk folder!"
      );
    }
    await router.push("/forgotPassword");
    showLoadingScreen({ type: false });
  }

  if (user && user.authenticated) {
    router.replace("/");
  }

  return (
    <>
      <Head>
        <title>Forgot Password</title>
        <meta
          name="Xtreme Tracking Forgot Password Page"
          content="Send a Password Reset Link to your Email here!"
        />
      </Head>
      <section>
        {successMessage && <p className="successMessage">{successMessage}</p>}
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        <LighterDiv>
          <h1 className="center">Forgot Password</h1>
          <ForgotPasswordForm onSubmit={forgotPasswordSubmitHandler} />
        </LighterDiv>
      </section>
    </>
  );
}

export default ForgotPasswordPage;
