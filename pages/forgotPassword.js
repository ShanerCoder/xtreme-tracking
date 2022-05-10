import { useState } from "react";
import { useRouter } from "next/router";
import { useStore } from "../context";
import { getValue } from "../utils/common";
import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";
import emailjs from "emailjs-com";

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
      emailjs.init("ZkE0JKCJDBvAmrn6s");
      console.log("About to send email");
      emailjs
        .send(
          "gmail",
          "XTForgotPassword",
          {
            to_name: data.body,
            URL: "http://test.com",
          },
          "ZkE0JKCJDBvAmrn6s"
        )
        .then(
          (result) => {
            router.push("/login");
          },
          (error) => {
            console.log(error);
            errorHandler("An error occurred sending the email", res);
          }
        );
      setErrorMessage(null);
    }
    /*emailjs
      .sendForm(
        "service_s3s29wn",
        "XTForgotPassword",
        { email },
        "ZkE0JKCJDBvAmrn6s"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );*/
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
