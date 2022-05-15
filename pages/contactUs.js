import { useState } from "react";
import LighterDiv from "../components/ui/LighterDiv";
import { useRouter } from "next/router";
import SingleMessageForm from "../components/form-components/Common/SingleMessageForm";
import { useStore } from "../context";
import { getValue } from "../utils/common";

function ContactUsPage() {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [state] = useStore();
  const user = getValue(state, ["user"], null);

  async function submitHandler(email) {
    const newEmail = {
      email: email,
      usernameWhoSent: user.username,
    };
    const response = await fetch("/api/contactUs/contact_us", {
      method: "POST",
      body: JSON.stringify(newEmail),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
      setSuccessMessage(null);
    } else {
      setSuccessMessage("Email Successfully Sent!");
      setErrorMessage(null);
    }
    router.push("/contactUs");
  }

  return (
    <>
      {successMessage && (
        <p style={{ textTransform: "capitalize", color: "green" }}>
          {successMessage}
        </p>
      )}
      {errorMessage && (
        <p style={{ textTransform: "capitalize", color: "red" }}>
          {errorMessage}
        </p>
      )}
      {user && user.authenticated ? (
        <SingleMessageForm
          messageTitle={"Contact Us"}
          messageSubject={
            "Write a Message and we will respond to your message if necessary within 7 working days"
          }
          submitHandler={submitHandler}
        />
      ) : (
        <h1 className="center">Create an account to send an enquiry</h1>
      )}
    </>
  );
}

export default ContactUsPage;
