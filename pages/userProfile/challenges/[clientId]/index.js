import Head from "next/head";
import { dbConnect } from "../../../../lib/db-connect";
import mongoose from "mongoose";
import ExerciseList from "../../../../models/exerciseTracking/exerciseList";
import CommonExerciseList from "../../../../models/exerciseTracking/commonExerciseList";
import ClientList from "../../../../models/personalTrainer/clientList";
import { getSession } from "next-auth/client";
import LighterDiv from "../../../../components/ui/LighterDiv";
import { useState } from "react";
import { useRouter } from "next/router";
import { useStore } from "../../../../context";
import { getValue } from "../../../../utils/common";
import SelectExerciseForm from "../../../../components/form-components/Common/SelectExerciseForm";
import Card from "../../../../components/ui/Card";
import { useLoadingStore } from "../../../../context/loadingScreen";

function SendAChallenge(props) {
  const router = useRouter();
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  const [state] = useStore();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const user = getValue(state, ["user"], null);

  async function handleSubmit(postData) {
    showLoadingScreen({ type: true });
    const bodyData = {
      personalTrainerUsername: user.username,
      clientUsername: props.client.clientUsername,
      ...postData,
    };

    const response = await fetch("/api/exerciseTracking/challenges", {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
      setSuccessMessage(null);
    } else {
      setSuccessMessage("Challenge Sent!");
      setErrorMessage(null);
    }
    await router.push("/userProfile/challenges/" + props.client.clientId);
    showLoadingScreen({ type: false });
  }

  function handleSetErrorMessage(errorMessage) {
    setErrorMessage(errorMessage);
    setSuccessMessage(null);
    router.push("/userProfile/challenges/" + props.client.clientId);
  }

  return (
    <>
      <Head>
        <title>Send A Challenge</title>
        <meta
          name="Xtreme Tracking Send A Challenge Page"
          content="Send a challenge to your client here!"
        />
      </Head>
      {successMessage && <p className="successMessage">{successMessage}</p>}
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      {props.errorMessage ? (
        <h1 className="center">{props.errorMessage}</h1>
      ) : (
        <>
          <LighterDiv>
            <h1 className="center">
              Send a challenge to {props.client.clientUsername}!
            </h1>

            <Card>
              <h2 className="center">Enter Exercise Details</h2>
              <SelectExerciseForm
                exerciseList={props.exerciseList}
                commonExerciseList={props.commonExerciseList}
                handleSubmit={handleSubmit}
                setErrorMessage={handleSetErrorMessage}
                submitButtonText={"Send Challenge"}
              />
            </Card>
          </LighterDiv>
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const clientId = context.query.clientId;
    const req = context.req;
    const session = await getSession({ req });
    if (!session) {
      throw new Error("Session not found");
    }

    await dbConnect();

    let clientUsername = await ClientList.findOne({
      _id: mongoose.Types.ObjectId(clientId),
    }).select({
      clientUsername: 1,
      _id: 0,
    });

    clientUsername = clientUsername.clientUsername;

    const exerciseList = await ExerciseList.find({
      username: clientUsername,
    }).sort({ muscleGroup: 1 });
    const commonExerciseList = await CommonExerciseList.find({}).sort({
      muscleGroup: 1,
    });
    const fullExerciseList = exerciseList.concat(commonExerciseList);

    return {
      props: {
        client: {
          clientId: clientId,
          clientUsername: clientUsername,
        },
        exerciseList: fullExerciseList.map((exercise) => ({
          exerciseName: exercise.exerciseName,
          muscleGroup: exercise.muscleGroup,
        })),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
export default SendAChallenge;
