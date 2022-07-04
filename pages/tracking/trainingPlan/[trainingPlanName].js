import Head from "next/head";
import TrainingPlan from "../../../models/exerciseTracking/trainingPlan";
import ExampleTrainingPlan from "../../../models/exerciseTracking/exampleTrainingPlan";
import ExerciseList from "../../../models/exerciseTracking/exerciseList";
import CommonExerciseList from "../../../models/exerciseTracking/commonExerciseList";
import { getSession } from "next-auth/client";
import { dbConnect } from "../../../lib/db-connect";
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

  async function addTrainingPlanToOwnList(postData) {
    showLoadingScreen({ type: true });
    if (!postData.listOfExercises.length) {
      setErrorMessage("No Exercises Added!");
      await router.push(
        "/tracking/trainingPlan/" + props.trainingPlan.trainingPlanName
      );
      showLoadingScreen({ type: false });
      return null;
    }

    const bodyData = {
      username: props.trainingPlan.ownUsername,
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
      await router.push(
        "/tracking/trainingPlan/" + props.trainingPlan.trainingPlanName
      );
    } else {
      setErrorMessage(null);
      await router.back();
    }
    showLoadingScreen({ type: false });
  }

  async function handleLoader(exerciseName) {
    showLoadingScreen({ type: true });
    await router.push(
      "/tracking/exerciseHistory/" +
        exerciseName +
        "?username=" +
        (props.trainingPlan.username
          ? props.trainingPlan.username
          : props.trainingPlan.ownUsername)
    );
    showLoadingScreen({ type: false });
  }

  return (
    <>
      <Head>
        <title>{props.trainingPlan.trainingPlanName} Training Plan</title>
        <meta
          name="Xtreme Tracking Training Plan Page"
          content="A Selected Training Plan can be viewed here!"
        />
      </Head>
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
          addTrainingPlanToOwnList={
            props.trainingPlan.exampleTrainingPlan
              ? addTrainingPlanToOwnList
              : null
          }
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

    if (session && !username) {
      const exampleTrainingPlan = await ExampleTrainingPlan.findOne({
        trainingPlanName: trainingPlanName,
      });

      return {
        props: {
          trainingPlan: {
            id: exampleTrainingPlan._id.toString(),
            ownUsername: session.user.username,
            trainingPlanName: exampleTrainingPlan.trainingPlanName,
            listOfExercises: exampleTrainingPlan.listOfExercises,
            exampleTrainingPlan: true,
          },
          ownView: false,
        },
      };
    } else if (session) {
      if (username == session.user.username) ownUsername = true;
      exerciseList = await ExerciseList.find({
        username: session.user.username,
      }).sort({ exerciseName: 1 });
    } else throw new Error("No Session");

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
    return {
      notFound: true,
    };
  }
}

export default TrainingPlanPage;
