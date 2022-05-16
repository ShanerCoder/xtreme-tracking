import Head from "next/head";
import { dbConnect } from "../../../lib/db-connect";
import classes from "../../PageStyling.module.css";
import Cryptr from "cryptr";
import PrivateMessage from "../../../models/privateMessage";
import { getSession } from "next-auth/client";
import LighterDiv from "../../../components/ui/LighterDiv";
import ViewSelectedDetailForm from "../../../components/form-components/Common/ViewSelectedDetailForm";
import { useState } from "react";
import { useRouter } from "next/router";
import { useStore } from "../../../context";
import { getValue } from "../../../utils/common";

function selectedMessage(props) {
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  const [state] = useStore();
  const user = getValue(state, ["user"], null);
  const [deleteButtonText, setDeleteButtonText] = useState(
    "Permanently Delete This Message"
  );
  let confirmDelete = false;

  async function handleDelete() {
    const deleteMessage = {
      username: user.username,
      messageId: props.privateMessage.id,
    };
    const response = await fetch(
      "/api/account/account_profile/private_messages",
      {
        method: "DELETE",
        body: JSON.stringify(deleteMessage),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
      router.push("/viewMessages/" + props.privateMessage.id);
    } else {
      setErrorMessage(null);
      router.push("/viewMessages");
    }
  }

  function handleDeleteButton() {
    if (!confirmDelete) {
      confirmDelete = true;
      setDeleteButtonText("Click twice to confirm deletion of this message.");
    } else {
      handleDelete();
    }
  }

  function handleWriteResponse() {
    router.push(
      "/userProfile/privateMessage/" + props.privateMessage.usernameFrom
    );
  }

  return (
    <>
      <Head>
        <title>Private Message</title>
        <meta
          name="Xtreme Tracking Selected Message Page"
          content="View a selected message here!"
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
      <LighterDiv>
        <h2 className={(classes.padding_top, "center")}>
          Viewing {props.privateMessage.usernameFrom}'s Message
        </h2>
        <ViewSelectedDetailForm
          detailText={props.privateMessage.privateMessage}
          usernameFrom={props.privateMessage.usernameFrom}
          dateCreated={props.privateMessage.dateCreated}
          optionOneText="Write Response"
          optionTwoText={deleteButtonText}
          handleOptionOne={handleWriteResponse}
          handleOptionTwo={handleDeleteButton}
        />
      </LighterDiv>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const privateMessageId = context.query.privateMessageId;
    const req = context.req;
    const session = await getSession({ req });
    if (!session) {
      throw new Error("Session not found");
    }
    const user = session.user.username;

    await dbConnect();
    const cryptr = new Cryptr(process.env.SECRET_KEY);

    const filter = { _id: privateMessageId };
    const message = await PrivateMessage.findOne(filter);

    if (user == message.usernameToReceive)
      return {
        props: {
          privateMessage: {
            id: message._id.toString(),
            username: message.usernameToReceive,
            usernameFrom: message.usernameWhoSent,
            privateMessage: cryptr.decrypt(message.privateMessage),
            dateCreated: message.createdAt.toString(),
          },
        },
      };
    else
      return {
        notFound: true,
      };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
export default selectedMessage;
