import Head from "next/head";
import { dbConnect } from "../../../../../lib/db-connect";
import { getSession } from "next-auth/client";
import LighterDiv from "../../../../../components/ui/LighterDiv";
import { useState } from "react";
import { useRouter } from "next/router";
import { useStore } from "../../../../../context";
import { getValue } from "../../../../../utils/common";
import Challenge from "../../../../../models/exerciseTracking/challenge";
import ExerciseDetails from "../../../../../components/forms/TrackingForm/ExerciseHistoryAtDate/ExerciseDetails";
import DarkerDiv from "../../../../../components/ui/DarkerDiv";
import { useLoadingStore } from "../../../../../context/loadingScreen";

function selectedChallenge(props) {
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  const [state] = useStore();
  const user = getValue(state, ["user"], null);
  const [deleteButtonText, setDeleteButtonText] = useState(
    "Permanently Delete This Challenge"
  );
  let confirmDelete = false;

  // Deletes Challenge
  async function handleDelete() {
    showLoadingScreen({ type: true });
    const deleteChallenge = {
      clientUsername: user.username,
      challengeRecordId: props.challenge.id,
    };
    const response = await fetch("/api/exerciseTracking/challenges", {
      method: "DELETE",
      body: JSON.stringify(deleteChallenge),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
      await router.push(
        "/userProfile/challenges/viewChallenges/" + props.challenge.id
      );
    } else {
      setErrorMessage(null);
      await router.push("/userProfile/challenges/viewChallenges/");
    }
    showLoadingScreen({ type: false });
  }

  // Function to handle the confirmation of deletion
  function handleDeleteButton() {
    if (!confirmDelete) {
      confirmDelete = true;
      setDeleteButtonText("Click twice to confirm deletion of this message.");
    } else {
      handleDelete();
    }
  }

  return (
    <>
      <Head>
        <title>Challenge</title>
        <meta
          name="Xtreme Tracking Selected Challenge Page"
          content="View a selected challenge here!"
        />
      </Head>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      <LighterDiv>
        <h2 className="center">
          Viewing {props.challenge.usernameFrom}'s Challenge
        </h2>
        <ul className="list">
          <ExerciseDetails
            removeExerciseRecord={handleDeleteButton}
            id={props.challenge.id}
            exerciseName={props.challenge.exerciseName}
            weightUsed={props.challenge.weightUsed}
            numberOfReps={props.challenge.numberOfReps}
            numberOfSets={props.challenge.numberOfSets}
            removeButtonText={deleteButtonText}
          />
        </ul>
      </LighterDiv>
      <DarkerDiv>
        <h2 className="center">Challenge Due Date: </h2>
        <h2 className="center">
          {new Date(props.challenge.dateToAchieveBy).toDateString()}
        </h2>
      </DarkerDiv>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const challengeId = context.query.challengeId;
    const req = context.req;
    const session = await getSession({ req });
    if (!session) {
      throw new Error("Session not found");
    }
    const user = session.user;

    await dbConnect();

    const filter = { _id: challengeId };

    // Finds selected challenge
    const challenge = await Challenge.findOne(filter);

    // Returns relevant information from challenge
    if (user.username == challenge.clientUsername)
      return {
        props: {
          challenge: {
            id: challenge._id.toString(),
            usernameFrom: challenge.personalTrainerUsername,
            exerciseName: challenge.exerciseName,
            weightUsed: challenge.weightUsed,
            numberOfReps: challenge.numberOfReps,
            numberOfSets: challenge.numberOfSets,
            dateToAchieveBy: challenge.dateToAchieveBy.toString(),
            dateCreated: challenge.createdAt.toString(),
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
export default selectedChallenge;
