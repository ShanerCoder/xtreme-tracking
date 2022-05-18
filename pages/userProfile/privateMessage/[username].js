import Head from "next/head";
import { dbConnect } from "../../../lib/db-connect";
import User from "../../../models/user";
import SingleMessageForm from "../../../components/form-components/Common/SingleMessageForm";
import { useStore } from "../../../context";
import { getValue } from "../../../utils/common";
import { useState } from "react";
import { useRouter } from "next/router";

function PrivateMessage(props) {
  const [state] = useStore();
  const user = getValue(state, ["user"], null);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  async function submitHandler(messageData) {
    const privateMessage = {
      usernameToReceive: props.user.username,
      usernameWhoSent: user.username,
      privateMessage: messageData,
    };
    const response = await fetch(
      "/api/account/account_profile/private_messages",
      {
        method: "POST",
        body: JSON.stringify(privateMessage),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
    } else {
      setErrorMessage(null);
      router.push("/userProfile/" + props.user.username);
    }
  }

  return (
    <>
      <Head>
        <title>Send A Message</title>
        <meta
          name="Xtreme Tracking Send A Message Page"
          content="Send a Private Message to a user here!"
        />
      </Head>
      {errorMessage && (
        <p
          className="center"
          style={{
            textTransform: "capitalize",
            color: "red",
            "font-size": "45px",
          }}
        >
          {errorMessage}
        </p>
      )}
      {user && user.authenticated ? (
        <SingleMessageForm
          messageTitle={"Sending a Message to: " + props.user.username}
          messageSubject={"Write your Message Here:"}
          submitHandler={submitHandler}
          buttonMessage="Send your Message"
        />
      ) : (
        <h1 className="center">
          Make a free account to send a message to: {props.user.username}
        </h1>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const username = context.query.username;
    await dbConnect();

    const usernameFilter = { username: username };
    const selectedUser = await User.findOne(usernameFilter);
    return {
      props: {
        user: {
          id: selectedUser.id,
          username: selectedUser.username,
          forename: selectedUser.forename,
          surname: selectedUser.surname,
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default PrivateMessage;
