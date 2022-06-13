import Head from "next/head";
import Calendar from "../../components/ui/Calendar";
import ExerciseList from "../../models/exerciseList";
import CommonExerciseList from "../../models/commonExerciseList";
import ExerciseHistory from "../../models/exerciseHistory";
import Goal from "../../models/goal";
import TrainingPlan from "../../models/trainingPlan";
import { useState } from "react";
import { getSession } from "next-auth/client";
import { dbConnect } from "../../lib/db-connect";
import LighterDiv from "../../components/ui/LighterDiv";
import DarkerDiv from "../../components/ui/DarkerDiv";
import { useStore } from "../../context";
import { getValue } from "../../utils/common";
import { useRouter } from "next/router";
import { Row } from "react-bootstrap";
import { useLoadingStore } from "../../context/loadingScreen";
import ExerciseHistoryView from "../../components/forms/TrackingForm/Views/ExerciseHistoryView";
import GoalsView from "../../components/forms/TrackingForm/Views/GoalsView";
import ChangeView from "../../components/form-components/Common/Views/ChangeView";
import TrainingPlansView from "../../components/form-components/Common/Views/TrainingPlansView";

function ViewTrackingProgress(props) {
  const router = useRouter();
  const [state] = useStore();
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  const [currentView, setCurrentView] = useState("Exercise History");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const user = getValue(state, ["user"], null);
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());

  const listOfExerciseHistoryDates = [];
  if (props.exerciseHistoryDates)
    props.exerciseHistoryDates.map((exercise) =>
      listOfExerciseHistoryDates.push(new Date(exercise.dateOfExercise))
    );

  async function handleLoader(URL) {
    showLoadingScreen({ type: true });
    await router.push(URL);
    showLoadingScreen({ type: false });
  }

  function handleSetErrorMessage(errorMessage) {
    setErrorMessage(errorMessage);
    setSuccessMessage(null);
    router.push("/tracking/");
  }

  async function handleAddExercise(postData) {
    showLoadingScreen({ type: true });
    const bodyData = {
      username: user.username,
      ...postData,
    };

    const response = await fetch("/api/exerciseTracking/exercise_history", {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
      setSuccessMessage(null);
    } else {
      setSuccessMessage("Exercise Successfully Added!");
      setErrorMessage(null);
    }
    await router.push("/tracking");
    showLoadingScreen({ type: false });
  }

  async function handleRemoveExerciseRecord(exerciseRecordId) {
    showLoadingScreen({ type: true });
    const bodyData = {
      exerciseRecordId: exerciseRecordId,
      username: user.username,
    };

    const response = await fetch("/api/exerciseTracking/exercise_history", {
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
    await router.push("/tracking");
    showLoadingScreen({ type: false });
  }

  async function handleAddGoal(postData) {
    showLoadingScreen({ type: true });
    const bodyData = {
      username: user.username,
      ...postData,
    };

    const response = await fetch("/api/exerciseTracking/goals", {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
      setSuccessMessage(null);
    } else {
      setSuccessMessage("Goal Successfully Added!");
      setErrorMessage(null);
    }
    await router.push("/tracking");
    showLoadingScreen({ type: false });
  }

  async function handleRemoveGoal(goalRecordId) {
    showLoadingScreen({ type: true });
    const bodyData = {
      goalRecordId: goalRecordId,
      username: user.username,
    };

    const response = await fetch("/api/exerciseTracking/goals", {
      method: "DELETE",
      body: JSON.stringify(bodyData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
      setSuccessMessage(null);
    } else {
      setSuccessMessage("Goal Successfully Removed!");
      setErrorMessage(null);
    }
    await router.push("/tracking");
    showLoadingScreen({ type: false });
  }

  async function handleRemoveTrainingPlan(trainingPlanId) {
    showLoadingScreen({ type: true });
    const bodyData = {
      trainingPlanId: trainingPlanId,
      username: user.username,
    };

    const response = await fetch("/api/exerciseTracking/training_plans", {
      method: "DELETE",
      body: JSON.stringify(bodyData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
      setSuccessMessage(null);
    } else {
      setSuccessMessage("Training Plan Successfully Removed!");
      setErrorMessage(null);
    }
    await router.push("/tracking");
    showLoadingScreen({ type: false });
  }

  return (
    <>
      <Head>
        <title>Tracking</title>
        <meta
          name="Xtreme Tracking - Tracking Page"
          content="Track your exercise progress here!"
        />
      </Head>
      {successMessage && <p className="successMessage">{successMessage}</p>}
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      {props.errorMessage ? (
        <h1 className="center">{props.errorMessage}</h1>
      ) : (
        <>
          <LighterDiv>
            <h1 className="center">Tracking Schedule</h1>

            <Calendar
              listOfDates={listOfExerciseHistoryDates}
              setTitleSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
            />
          </LighterDiv>

          <DarkerDiv>
            <Row>
              <h1 className="center" style={{ paddingBottom: "25px" }}>
                Currently viewing: {currentView}
              </h1>
            </Row>
            {
              // Buttons to set current view
            }
            <ChangeView setCurrentView={setCurrentView} />
            {currentView == "Exercise History" && (
              <ExerciseHistoryView
                exerciseList={props.exerciseList}
                exerciseHistory={props.exerciseHistory}
                commonExerciseList={props.commonExerciseList}
                selectedDate={selectedDate}
                handleAddExercise={handleAddExercise}
                handleRemoveExerciseRecord={handleRemoveExerciseRecord}
              />
            )}
            {currentView == "Goals" && (
              <GoalsView
                exerciseList={props.exerciseList}
                commonExerciseList={props.commonExerciseList}
                goalsList={props.goalsList}
                handleAddGoal={handleAddGoal}
                handleRemoveGoal={handleRemoveGoal}
                handleSetErrorMessage={handleSetErrorMessage}
                selectedDate={selectedDate}
              />
            )}
            {currentView == "Training Plans" && (
              <TrainingPlansView
                trainingPlans={props.trainingPlansList}
                handleLoader={handleLoader}
                handleRemoveTrainingPlan={handleRemoveTrainingPlan}
              />
            )}
          </DarkerDiv>
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

    const exerciseHistory = await ExerciseHistory.find({
      username: session.user.username,
    }).sort({ dateOfExercise: 1 });
    const exerciseList = await ExerciseList.find({
      username: session.user.username,
    }).sort({ exerciseName: 1 });
    const commonExerciseList = await CommonExerciseList.find({}).sort({
      exerciseName: 1,
    });
    const goalsList = await Goal.find({ username: session.user.username }).sort(
      { dateToAchieveBy: 1 }
    );
    const trainingPlansList = await TrainingPlan.find({
      username: session.user.username,
    }).sort({ _id: 1 });

    return {
      props: {
        exerciseHistory: exerciseHistory.map((exercise) => ({
          id: exercise._id.toString(),
          username: exercise.username,
          exerciseName: exercise.exerciseName,
          weightUsed: exercise.weightUsed,
          numberOfReps: exercise.numberOfReps,
          numberOfSets: exercise.numberOfSets,
          dateOfExercise: exercise.dateOfExercise.toString(),
        })),
        exerciseHistoryDates: exerciseHistory.map((exercise) => ({
          dateOfExercise: exercise.dateOfExercise.toString(),
        })),
        exerciseList: exerciseList.map((exercise) => ({
          exerciseName: exercise.exerciseName,
          muscleGroup: exercise.muscleGroup,
        })),
        commonExerciseList: commonExerciseList.map((exercise) => ({
          exerciseName: exercise.exerciseName,
          muscleGroup: exercise.muscleGroup,
        })),
        goalsList: goalsList.map((goal) => ({
          id: goal._id.toString(),
          username: goal.username,
          exerciseName: goal.exerciseName,
          weightUsed: goal.weightUsed,
          numberOfReps: goal.numberOfReps,
          numberOfSets: goal.numberOfSets,
          dateToAchieveBy: goal.dateToAchieveBy.toString(),
        })),
        trainingPlansList: trainingPlansList.map((plan) => ({
          id: plan._id.toString(),
          username: plan.username,
          trainingPlanName: plan.trainingPlanName,
          numberOfExercises: plan.listOfExercises.length,
        })),
      },
    };
  } catch (error) {
    return {
      props: {
        errorMessage: "Make an account to track your exercise progress!",
      },
    };
  }
}

export default ViewTrackingProgress;
