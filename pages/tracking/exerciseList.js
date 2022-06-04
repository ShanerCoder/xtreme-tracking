import Head from "next/head";
import ExerciseList from "../../models/exerciseList";
import CommonExerciseList from "../../models/commonExerciseList";
import { getSession } from "next-auth/client";
import { dbConnect } from "../../lib/db-connect";
import LighterDiv from "../../components/ui/LighterDiv";
import DarkerDiv from "../../components/ui/DarkerDiv";
import { useStore } from "../../context";
import { useState } from "react";
import { getValue } from "../../utils/common";
import { useRouter } from "next/router";
import NewCustomExerciseSection from "../../components/forms/TrackingForm/ExerciseList/NewCustomExerciseSection";
import FullListOfExercises from "../../components/forms/TrackingForm/ExerciseList/FullListOfExercises";

function ExerciseListPage(props) {
  const router = useRouter();
  const [state] = useStore();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const user = getValue(state, ["user"], null);
  const listOfMuscleGroups = [];

  props.commonExerciseList.map(
    (exercise) =>
      !listOfMuscleGroups.includes(exercise.muscleGroup) &&
      listOfMuscleGroups.push(exercise.muscleGroup)
  );

  async function handleAddNewExercise(postData) {
    const bodyData = {
      username: user.username,
      ...postData,
    };

    const response = await fetch("/api/exerciseTracking/list_of_exercises", {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
      setSuccessMessage(null);
    } else {
      setSuccessMessage("Exercise Successfully Created!");
      setErrorMessage(null);
    }
    router.push("/tracking/exerciseList");
  }

  async function handleRemoveExercise(exerciseName) {
    const bodyData = {
      exerciseName: exerciseName,
      username: user.username,
    };

    const response = await fetch("/api/exerciseTracking/list_of_exercises", {
      method: "DELETE",
      body: JSON.stringify(bodyData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
      setSuccessMessage(null);
    } else {
      setSuccessMessage("Exercise Successfully Removed!");
      setErrorMessage(null);
    }
    router.push("/tracking/exerciseList");
  }

  return (
    <>
      <Head>
        <title>Exercise List</title>
        <meta
          name="Xtreme Tracking Exercise List Page"
          content="View the list of all your exercises here!"
        />
      </Head>
      {successMessage && <p className="successMessage">{successMessage}</p>}
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      {props.errorMessage ? (
        <h1 className="center">{props.errorMessage}</h1>
      ) : (
        <>
          <LighterDiv>
            <h1 className="center">Exercise List</h1>
          </LighterDiv>
          <DarkerDiv>
            <NewCustomExerciseSection
              muscleGroups={listOfMuscleGroups}
              addExercise={handleAddNewExercise}
            />
          </DarkerDiv>
          <LighterDiv>
            <FullListOfExercises
              exerciseList={props.exerciseList}
              commonExerciseList={props.commonExerciseList}
              listOfMuscleGroups={listOfMuscleGroups}
              removeExercise={handleRemoveExercise}
            />
          </LighterDiv>
        </>
      )}
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
    }).sort({ muscleGroup: 1 });
    const commonExerciseList = await CommonExerciseList.find({}).sort({
      muscleGroup: 1,
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
        errorMessage: "Make an account to view the list of your exercises!",
      },
    };
  }
}

export default ExerciseListPage;
