import { useState } from "react";
import { useRouter } from "next/router";
import { useStore } from "../context";
import { getValue } from "../utils/common";
import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";

function ForgotPasswordPage() {
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  const [state] = useStore();
  const user = getValue(state, ["user"], null);

  async function forgotPasswordSubmitHandler(email) {
    const response = await fetch("/api/forgot_password", {
      method: "POST",
      body: JSON.stringify(email),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
      router.push("/forgotPassword");
    } else {
      console.log("Success");
      setErrorMessage(null);
    }
  }

  if (user && user.authenticated) {
    router.replace("/");
  }

  return (
    <section>
      <h1>Forgot Password</h1>
      {errorMessage && (
        <p style={{ textTransform: "capitalize", color: "red" }}>
          {errorMessage}
        </p>
      )}
      <ForgotPasswordForm onSubmit={forgotPasswordSubmitHandler} />
    </section>
  );
}

export default ForgotPasswordPage;