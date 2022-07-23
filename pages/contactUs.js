import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import SingleMessageForm from "../components/form-components/Common/SingleMessageForm";
import { useStore } from "../context";
import { getValue } from "../utils/common";
import { useLoadingStore } from "../context/loadingScreen";

function ContactUsPage() {
  const router = useRouter();
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [state] = useStore();
  const user = getValue(state, ["user"], null);

  // Function to submit contact us email
  async function submitHandler(email) {
    showLoadingScreen({ type: true });
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
    await router.push("/contactUs");
    showLoadingScreen({ type: false });
  }

  return (
    <>
      <Head>
        <title>Contact Us</title>
        <meta
          name="Xtreme Tracking Contact Us Page"
          content="Contact the Xtreme Tracking team here!"
        />
      </Head>
      {successMessage && <p className="successMessage">{successMessage}</p>}
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      {user && user.authenticated ? (
        <SingleMessageForm
          messageTitle={"Contact Us"}
          messageSubject={
            "Write a Message and we will respond to your message if necessary within 7 working days"
          }
          submitHandler={submitHandler}
          buttonMessage="Send your Message"
        />
      ) : (
        <h1 className="center">Create an account to send an enquiry</h1>
      )}
    </>
  );
}

export default ContactUsPage;
