import Head from "next/head";
import Calendar from "../../components/ui/Calendar";
import ExerciseList from "../../models/exerciseTracking/exerciseList";
import CommonExerciseList from "../../models/exerciseTracking/commonExerciseList";
import FoodList from "../../models/calorieTracking/foodList";
import FoodHistory from "../../models/calorieTracking/foodHistory";
import ExerciseHistory from "../../models/exerciseTracking/exerciseHistory";
import Goal from "../../models/exerciseTracking/goal";
import TrainingPlan from "../../models/exerciseTracking/trainingPlan";
import CheckInList from "../../models/visitation/checkInList";
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
import { endOfDay, startOfDay } from "date-fns";
import FoodHistoryView from "../../components/forms/TrackingForm/Views/FoodHistoryView";

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
  const listOfFoodHistoryDates = [];
  if (props.exerciseHistoryDates)
    props.exerciseHistoryDates.map((exercise) =>
      listOfExerciseHistoryDates.push(new Date(exercise.dateOfExercise))
    );
  if (props.foodHistoryDates)
    props.foodHistoryDates.map((food) =>
      listOfFoodHistoryDates.push(new Date(food.dateEaten))
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

  async function handleAddFood(postData) {
    showLoadingScreen({ type: true });
    const bodyData = {
      username: user.username,
      ...postData,
    };

    const response = await fetch("/api/calorieTracking/food_history", {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
      setSuccessMessage(null);
    } else {
      setSuccessMessage("Food Successfully Added!");
      setErrorMessage(null);
    }
    await router.push("/tracking");
    showLoadingScreen({ type: false });
  }

  async function handleRemoveFoodRecord(foodRecordId) {
    showLoadingScreen({ type: true });
    const bodyData = {
      foodRecordId: foodRecordId,
      username: user.username,
    };

    const response = await fetch("/api/calorieTracking/food_history", {
      method: "DELETE",
      body: JSON.stringify(bodyData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
      setSuccessMessage(null);
    } else {
      setSuccessMessage("Food Successfully Removed!");
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
              listOfSecondaryDates={listOfFoodHistoryDates}
              secondImagesrc={"apple.png"}
              thirdImagesrc={"appleAndDumbbell.png"}
              setTitleSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
              maximumDate={new Date()}
            />
          </LighterDiv>

          <DarkerDiv>
            {!props.checkedInToday &&
              selectedDate == new Date().toDateString() && (
                <Row>
                  <label
                    className="center linkLabel"
                    style={{ fontSize: "40px" }}
                    onClick={() => {
                      handleLoader(
                        "/userProfile/gymVisitation/" + user.username
                      );
                    }}
                  >
                    Don't forget to Check In Today!
                  </label>
                  <hr className="solid" />
                </Row>
              )}
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
                selectedDate={selectedDate}
                handleAddExercise={handleAddExercise}
                handleRemoveExerciseRecord={handleRemoveExerciseRecord}
              />
            )}
            {currentView == "Food History" && (
              <FoodHistoryView
                foodList={props.foodList}
                foodHistory={props.foodHistory}
                selectedDate={selectedDate}
                handleAddFood={handleAddFood}
                handleRemoveFoodRecord={handleRemoveFoodRecord}
              />
            )}
            {currentView == "Goals" && (
              <GoalsView
                exerciseList={props.exerciseList}
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

    // EXERCISE INFORMATION
    const exerciseHistory = await ExerciseHistory.find({
      username: session.user.username,
    }).sort({ dateOfExercise: 1 });
    const exerciseList = await ExerciseList.find({
      username: session.user.username,
    }).sort({ exerciseName: 1 });
    const commonExerciseList = await CommonExerciseList.find({}).sort({
      exerciseName: 1,
    });
    const fullExerciseList = exerciseList.concat(commonExerciseList);
    // END OF EXERCISE INFORMATION

    // FOOD INFORMATION
    const foodList = await FoodList.find({
      username: session.user.username,
    }).sort({ foodName: 1 });

    const foodHistory = await FoodHistory.find({
      username: session.user.username,
    }).sort({ gramsEaten: 1 });
    // END OF FOOD INFORMATION

    // GOAL INFORMATION
    const goalsList = await Goal.find({ username: session.user.username }).sort(
      { dateToAchieveBy: 1 }
    );
    // END OF GOAL INFORMATION

    // TRAINING PLAN INFORMATION
    const trainingPlansList = await TrainingPlan.find({
      username: session.user.username,
    }).sort({ _id: 1 });
    // END OF TRAINING PLAN INFORMATION

    // CHECKED IN TODAY INFORMATION
    let checkedInToday = await CheckInList.findOne({
      username: session.user.username,
      dateOfCheckIn: {
        $gte: startOfDay(new Date()),
        $lte: endOfDay(new Date()),
      },
    });

    if (checkedInToday) {
      checkedInToday = true;
    } else checkedInToday = false;
    // END OF CHECKED IN TODAY INFORMATION

    return {
      props: {
        checkedInToday: checkedInToday,
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
        exerciseList: fullExerciseList.map((exercise) => ({
          exerciseName: exercise.exerciseName,
          muscleGroup: exercise.muscleGroup,
        })),
        foodHistory: foodHistory.map((food) => ({
          id: food._id.toString(),
          foodName: food.foodName,
          gramsEaten: food.gramsEaten,
          totalCalories: food.totalCalories,
          dateEaten: food.dateEaten.toString(),
        })),
        foodHistoryDates: foodHistory.map((food) => ({
          dateEaten: food.dateEaten.toString(),
        })),
        foodList: foodList.map((food) => ({
          foodName: food.foodName,
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
