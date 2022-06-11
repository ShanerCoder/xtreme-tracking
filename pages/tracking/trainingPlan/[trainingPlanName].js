import TrainingPlan from "../../../models/trainingPlan";
import ExerciseList from "../../../models/exerciseList";
import CommonExerciseList from "../../../models/commonExerciseList";
import { getSession } from "next-auth/client";
import { dbConnect } from "../../../lib/db-connect";
import LighterDiv from "../../../components/ui/LighterDiv";
import TrainingPlanSection from "../../../components/forms/TrackingForm/TrainingPlans/TrainingPlanSection";
import { useLoadingStore } from "../../../context/loadingScreen";
import { useRouter } from "next/router";
import { useState } from "react";

function TrainingPlanPage(props) {
  const router = useRouter();
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  async function updateTrainingPlan(postData) {
    showLoadingScreen({ type: true });
    if (!postData.listOfExercises.length) {
      setErrorMessage("No Exercises Added!");
      await router.push(
        "/tracking/trainingPlan/" +
          props.trainingPlan.trainingPlanName +
          "?username=" +
          props.trainingPlan.username
      );
      showLoadingScreen({ type: false });
      return null;
    }

    const bodyData = {
      id: props.trainingPlan.id,
      username: props.trainingPlan.username,
      ...postData,
    };
    const response = await fetch("/api/exerciseTracking/training_plans", {
      method: "PUT",
      body: JSON.stringify(bodyData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
      setSuccessMessage(null);
    } else {
      setErrorMessage(null);
      setSuccessMessage("Training Plan Updated!");
    }
    await router.push(
      "/tracking/trainingPlan/" +
        props.trainingPlan.trainingPlanName +
        "?username=" +
        props.trainingPlan.username
    );
    showLoadingScreen({ type: false });
  }

  async function handleLoader(exerciseName) {
    showLoadingScreen({ type: true });
    await router.push(
      "/tracking/exerciseHistory/" +
        exerciseName +
        "?username=" +
        props.trainingPlan.username
    );
    showLoadingScreen({ type: false });
  }

  return (
    <>
      {successMessage && <p className="successMessage">{successMessage}</p>}
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      {props.ownView ? (
        <TrainingPlanSection
          trainingPlan={props.trainingPlan}
          exerciseList={props.exerciseList}
          commonExerciseList={props.commonExerciseList}
          addTrainingPlan={updateTrainingPlan}
          view={"UpdatePlan"}
          handleLoader={handleLoader}
        />
      ) : (
        <TrainingPlanSection
          trainingPlan={props.trainingPlan}
          exerciseList={props.exerciseList}
          commonExerciseList={props.commonExerciseList}
          addTrainingPlan={updateTrainingPlan}
          view={"OtherUserView"}
          handleLoader={handleLoader}
        />
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const trainingPlanName = context.query.trainingPlanName;
    let username = context.query.username;
    let ownUsername = null;
    let exerciseList = null;
    const req = context.req;
    const session = await getSession({ req });
    await dbConnect();

    if (!username) throw new Error("No Username");
    if (!username && session) username = session.user.username;
    if (session) {
      if (username == session.user.username) ownUsername = true;
      exerciseList = await ExerciseList.find({
        username: session.user.username,
      }).sort({ exerciseName: 1 });
    }

    const trainingPlan = await TrainingPlan.findOne({
      username: username,
      trainingPlanName: trainingPlanName,
    });

    const commonExerciseList = await CommonExerciseList.find({}).sort({
      exerciseName: 1,
    });

    if (trainingPlan && ownUsername) {
      return {
        props: {
          trainingPlan: {
            id: trainingPlan._id.toString(),
            ownUsername: ownUsername,
            username: trainingPlan.username,
            trainingPlanName: trainingPlan.trainingPlanName,
            listOfExercises: trainingPlan.listOfExercises,
          },
          exerciseList: exerciseList.map((exercise) => ({
            exerciseName: exercise.exerciseName,
            muscleGroup: exercise.muscleGroup,
          })),
          commonExerciseList: commonExerciseList.map((exercise) => ({
            exerciseName: exercise.exerciseName,
            muscleGroup: exercise.muscleGroup,
          })),
          ownView: true,
        },
      };
    } else if (trainingPlan) {
      return {
        props: {
          trainingPlan: {
            id: trainingPlan._id.toString(),
            ownUsername: ownUsername,
            username: trainingPlan.username,
            trainingPlanName: trainingPlan.trainingPlanName,
            listOfExercises: trainingPlan.listOfExercises,
          },
          ownView: false,
        },
      };
    } else {
      throw new Error("Training Plan Not Found");
    }
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}

export default TrainingPlanPage;
