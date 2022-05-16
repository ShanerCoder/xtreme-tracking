import Head from "next/head";
import { dbConnect } from "../../../lib/db-connect";
import User from "../../../models/user";
import Profile from "../../../models/userProfile";
import SingleMessageForm from "../../../components/form-components/Common/SingleMessageForm";
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
      {user &&
        user.authenticated &&
        props.userprofile.personalTrainerProfile && (
          <SingleMessageForm
            messageTitle={
              "Sending a Consultation Request to: " + props.user.username
            }
            messageSubject={"Write your Request Here:"}
            submitHandler={submitHandler}
            buttonMessage="Send your Enquiry"
          />
        )}
      {user &&
        user.authenticated &&
        !props.userprofile.personalTrainerProfile && (
          <h1 className="center">
            {props.user.username} does not currently have a Personal Trainer
            Profile!
          </h1>
        )}
      {!user && (
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

    //NOTICE - ADD IN A CHECK FOR IF THE USER HAS ALREADY MADE A REQUEST

    const usernameFilter = { username: username };
    const selectedUser = await User.findOne(usernameFilter);
    const userId = selectedUser.id;
    const selectedProfile = await Profile.findOne({ _id: userId });
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
