import Head from "next/head";
import { dbConnect } from "../../../lib/db-connect";
import User from "../../../models/user";
import Profile from "../../../models/userProfile";
import SingleMessageForm from "../../../components/form-components/Common/SingleMessageForm";
import ConsultationRequest from "../../../models/consultationRequest";
import ClientList from "../../../models/clientList";
import { getSession } from "next-auth/client";
import { useStore } from "../../../context";
import { getValue } from "../../../utils/common";
import { useState } from "react";
import { useRouter } from "next/router";

function RequestConsultation(props) {
  const [state] = useStore();
  const user = getValue(state, ["user"], null);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  async function submitHandler(messageData) {
    const consultationRequest = {
      usernameToReceive: props.user.username,
      usernameWhoSent: user.username,
      consultationRequest: messageData,
    };
    const response = await fetch(
      "/api/account/account_profile/consultation_requests",
      {
        method: "POST",
        body: JSON.stringify(consultationRequest),
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
        <title>Request Consultation</title>
        <meta
          name="Xtreme Tracking Request Consultation Page"
          content="Request a Consultation from a user here!"
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
      {props.userprofile &&
        props.userprofile.personalTrainerProfile &&
        !props.error && (
          <SingleMessageForm
            messageTitle={
              "Sending a Consultation Request to: " + props.user.username
            }
            messageSubject={"Write your Request Here:"}
            submitHandler={submitHandler}
            buttonMessage="Send your Request"
          />
        )}
      {props.error && (
        <h1
          className="center"
          style={{ wordWrap: "break-word", whiteSpace: "pre-line" }}
        >
          {props.error.errorMessage}
        </h1>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const personalTrainerUsername = context.query.username;
    await dbConnect();

    const req = context.req;
    const session = await getSession({ req });
    if (!session) {
      return {
        props: {
          error: {
            errorMessage:
              "Make a free account to request a consultation from: " +
              personalTrainerUsername,
          },
        },
      };
    }
    const clientUsername = session.user.username;
    if (clientUsername == personalTrainerUsername)
      throw new Error("Attempting to send request to their own Profile");

    const usernameFilter = { username: personalTrainerUsername };
    const selectedUser = await User.findOne(usernameFilter);
    const userId = selectedUser.id;
    const selectedProfile = await Profile.findOne({ _id: userId });

    if (!selectedProfile.personalTrainerProfile)
      return {
        props: {
          error: {
            errorMessage:
              personalTrainerUsername +
              " does not currently have a Personal Trainer Profile!",
          },
        },
      };

    const userAlreadyAClient = await ClientList.find({
      personalTrainerUsername: personalTrainerUsername,
      clientUsername: clientUsername,
    });

    if (userAlreadyAClient.length)
      return {
        props: {
          error: {
            errorMessage:
              "You are already a client of " + personalTrainerUsername + "!",
          },
        },
      };

    const userHasMadePriorRequest = await ConsultationRequest.find({
      usernameToReceive: personalTrainerUsername,
      usernameWhoSent: clientUsername,
    });

    if (userHasMadePriorRequest.length)
      return {
        props: {
          error: {
            errorMessage:
              "You have already sent a consultation request to: " +
              personalTrainerUsername +
              "\n\nKeep an eye on your messages for a response!",
          },
        },
      };

    return {
      props: {
        user: {
          id: selectedUser.id,
          username: selectedUser.username,
          forename: selectedUser.forename,
          surname: selectedUser.surname,
        },
        userprofile: {
          profilePictureId: selectedProfile.profilePictureId,
          profileDescription: selectedProfile.profileDescription,
          personalTrainerProfile: selectedProfile.personalTrainerProfile,
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default RequestConsultation;
