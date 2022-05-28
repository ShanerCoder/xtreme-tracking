import Head from "next/head";
import Calendar from "../../components/ui/Calendar";
import ExerciseList from "../../models/exerciseList";
import CommonExerciseList from "../../models/commonExerciseList";
import ExerciseHistory from "../../models/exerciseHistory";
import { useState } from "react";
import { getSession } from "next-auth/client";
import { dbConnect } from "../../lib/db-connect";
import LighterDiv from "../../components/ui/LighterDiv";
import DarkerDiv from "../../components/ui/DarkerDiv";
import { useStore } from "../../context";
import { getValue } from "../../utils/common";
import { useRouter } from "next/router";
import NewExerciseSection from "../../components/forms/TrackingForm/NewExerciseSection";
import { Card, Col, Row } from "react-bootstrap";
import ExercisesAtDateSection from "../../components/forms/TrackingForm/ExercisesAtDateSection";

function ViewTrackingProgress(props) {
  const router = useRouter();
  const [state] = useStore();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const user = getValue(state, ["user"], null);
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());

  const listOfExerciseHistoryDates = [];
  if (props.exerciseHistoryDates)
    props.exerciseHistoryDates.map((exercise) =>
      listOfExerciseHistoryDates.push(new Date(exercise.dateOfExercise))
    );

  function setSelectedDateInfo(date) {
    setSelectedDate(date.toDateString());
  }

  function handleCreateNewExercise() {
    router.push("/tracking/exerciseList");
  }

  async function handleAddExercise(postData) {
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
    router.push("/tracking");
  }

  async function handleRemoveExerciseRecord(exerciseRecordId) {
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
    router.push("/tracking");
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
      {successMessage && (
        <p style={{ textTransform: "capitalize", color: "green" }}>
          {successMessage}
        </p>
      )}
      {errorMessage && (
        <p style={{ textTransform: "capitalize", color: "red" }}>
          {errorMessage}
        </p>
      )}
      {props.errorMessage ? (
        <h1 className="center">{props.errorMessage}</h1>
      ) : (
        <>
          <LighterDiv>
            <h1 className="center">Tracking Schedule</h1>

            <Calendar
              listOfDates={listOfExerciseHistoryDates}
              setTitleSelectedDate={setSelectedDateInfo}
              selectedDate={selectedDate}
            />
          </LighterDiv>

          <DarkerDiv>
            <Row>
              <Col style={{ paddingBottom: "25px" }} xs={12} lg={4}>
                <NewExerciseSection
                  exerciseList={props.exerciseList}
                  commonExerciseList={props.commonExerciseList}
                  selectedDate={selectedDate}
                  addExercise={handleAddExercise}
                  createNewExercise={handleCreateNewExercise}
                />
              </Col>
              <Col xs={12} lg={8}>
                {props.exerciseHistory.length ? (
                  <ExercisesAtDateSection
                    removeExerciseRecord={handleRemoveExerciseRecord}
                    exercises={props.exerciseHistory}
                    selectedDate={selectedDate}
                  />
                ) : (
                  <Card>
                    <h3 className="center" style={{ padding: "15px" }}>
                      No Exercises Have been added
                    </h3>
                  </Card>
                )}
              </Col>
            </Row>
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
