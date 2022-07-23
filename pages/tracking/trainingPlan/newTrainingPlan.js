import Head from "next/head";
import { getSession } from "next-auth/client";
import { dbConnect } from "../../../lib/db-connect";
import ExerciseList from "../../../models/exerciseTracking/exerciseList";
import CommonExerciseList from "../../../models/exerciseTracking/commonExerciseList";
import TrainingPlanSection from "../../../components/forms/TrackingForm/TrainingPlans/TrainingPlanSection";
import { useStore } from "../../../context";
import { getValue } from "../../../utils/common";
import { useLoadingStore } from "../../../context/loadingScreen";
import { useState } from "react";
import { useRouter } from "next/router";

function NewTrainingPlan(props) {
  const [state] = useStore();
  const user = getValue(state, ["user"], null);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  const [loadingScreen, showLoadingScreen] = useLoadingStore();

  async function handleLoader(exerciseName) {
    showLoadingScreen({ type: true });
    await router.push(
      "/tracking/exerciseHistory/" + exerciseName + "?username=" + user.username
    );
    showLoadingScreen({ type: false });
  }

  // Function to add training plan
  async function addTrainingPlan(postData) {
    showLoadingScreen({ type: true });
    if (!postData.listOfExercises.length) {
      setErrorMessage("No Exercises Added!");
      await router.push("/tracking/trainingPlan/newTrainingPlan/");
      showLoadingScreen({ type: false });
      return null;
    }

    const bodyData = {
      username: user.username,
      ...postData,
    };
    const response = await fetch("/api/exerciseTracking/training_plans", {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
      await router.push("/tracking/trainingPlan/newTrainingPlan/");
    } else {
      setErrorMessage(null);
      await router.push("/tracking/");
    }
    showLoadingScreen({ type: false });
  }

  return (
    <>
      <Head>
        <title>New Training Plan</title>
        <meta
          name="Xtreme Tracking New Training Plan Page"
          content="A New Training Plan can be created here!"
        />
      </Head>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      <TrainingPlanSection
        exerciseList={props.exerciseList}
        commonExerciseList={props.commonExerciseList}
        addTrainingPlan={addTrainingPlan}
        view={"AddPlan"}
        handleLoader={handleLoader}
      />
    </>
  );
}

export async function getServerSideProps({ req }) {
  try {
    const session = await getSession({ req });
    if (!session) {
      throw new Error("Session not found");
    }

    await dbConnect();

    // Finds exercises and common exercises
    const exerciseList = await ExerciseList.find({
      username: session.user.username,
    }).sort({ exerciseName: 1 });
    const commonExerciseList = await CommonExerciseList.find({}).sort({
      exerciseName: 1,
    });

    // Returns exercises and common exercises
    return {
      props: {
        exerciseList: exerciseList.map((exercise) => ({
          exerciseName: exercise.exerciseName,
          muscleGroup: exercise.muscleGroup,
        })),
        commonExerciseList: commonExerciseList.map((exercise) => ({
          exerciseName: exercise.exerciseName,
          muscleGroup: exercise.muscleGroup,
        })),
      },
    };
  } catch (error) {
    return {
      props: {
        errorMessage: "Make an account to make a training plan!",
      },
    };
  }
}

export default NewTrainingPlan;
