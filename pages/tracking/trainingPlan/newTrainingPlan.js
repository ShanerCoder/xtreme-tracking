import { getSession } from "next-auth/client";
import { dbConnect } from "../../../lib/db-connect";
import ExerciseList from "../../../models/exerciseList";
import CommonExerciseList from "../../../models/commonExerciseList";
import NewTrainingPlanSection from "../../../components/forms/TrackingForm/TrainingPlans/NewTrainingPlanSection";
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

  async function addNewTrainingPlan(postData) {
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
      await router.push("/tracking/newTrainingPlan/");
    } else {
      setErrorMessage(null);
      await router.push("/tracking/");
    }
    showLoadingScreen({ type: false });
  }

  return (
    <>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      <NewTrainingPlanSection
        exerciseList={props.exerciseList}
        commonExerciseList={props.commonExerciseList}
        addNewTrainingPlan={addNewTrainingPlan}
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

    const exerciseList = await ExerciseList.find({
      username: session.user.username,
    }).sort({ exerciseName: 1 });
    const commonExerciseList = await CommonExerciseList.find({}).sort({
      exerciseName: 1,
    });

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
