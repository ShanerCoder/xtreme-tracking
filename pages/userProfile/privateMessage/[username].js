import { dbConnect } from "../../../lib/db-connect";
import User from "../../../models/user";
import MessageForm from "../../../components/forms/MessagesForm/CreateMessageForm";
import { useStore } from "../../../context";
import { getValue } from "../../../utils/common";
import { useState } from "react";
import { useRouter } from "next/router";

function ProfileView(props) {
  const [state, dispatch] = useStore();
  const user = getValue(state, ["user"], null);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  async function submitHandler(messageData) {
    const privateMessage = {
      usernameToReceive: props.user.username,
      usernameWhoSent: user.username,
      privateMessage: messageData,
    };
    const response = await fetch("/api/private_messages", {
      method: "POST",
      body: JSON.stringify(privateMessage),
      headers: {
        "Content-Type": "application/json",
      },
    });
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
        <MessageForm
          username={props.user.username}
          forename={props.user.forename}
          surname={props.user.surname}
          messageTitle={"Sending a Message to: " + props.user.username}
          messageSubject={"Write your Message Here:"}
          submitHandler={submitHandler}
        />
      ) : (
        <h1 className="center">
          Make a free account to send a message to: {props.user.username}
        </h1>
      )}
    </>
  );
}

export async function getStaticPaths() {
  await dbConnect();
  let user = User.find();
  const filter = {};
  const userprofileList = await user.find(filter).select("username");

  return {
    fallback: "blocking",
    paths: userprofileList.map((user) => ({
      params: {
        username: user.username.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const username = context.params.username;
  await dbConnect();

  try {
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
  } catch (exception) {
    return {
      notFound: true,
    };
  }
}
export default ProfileView;
