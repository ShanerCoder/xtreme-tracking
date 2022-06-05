import ExerciseHistory from "../../../models/exerciseHistory";
import { getSession } from "next-auth/client";
import { dbConnect } from "../../../lib/db-connect";
import ExerciseHistorySection from "../../../components/forms/TrackingForm/ExerciseList/ExerciseHistory/ExerciseHistorySection";
import { useRouter } from "next/router";

function exerciseHistory(props) {
  const router = useRouter();
  async function handleRemoveExerciseRecord(exerciseRecordId) {
    const bodyData = {
      exerciseRecordId: exerciseRecordId,
      username: props.username,
    };

    const response = await fetch("/api/exerciseTracking/exercise_history", {
      method: "DELETE",
      body: JSON.stringify(bodyData),
      headers: { "Content-Type": "application/json" },
    });
    await response.json();
    router.push("/tracking/exerciseHistory/" + props.exerciseName);
  }

  return props.errorMessage ? (
    <h2 className="center" style={{ paddingTop: "20px" }}>
      {props.errorMessage}
    </h2>
  ) : (
    <ExerciseHistorySection
      exerciseName={props.exerciseName}
      exerciseHistory={props.exerciseHistory}
      removeExerciseRecord={handleRemoveExerciseRecord}
    />
  );
}

export async function getServerSideProps(context) {
  try {
    const exerciseName = context.query.exerciseName;
    const req = context.req;
    const session = await getSession({ req });
    if (!session) {
      throw new Error("Session not Found");
    }
    await dbConnect();

    const exerciseHistory = await ExerciseHistory.find({
      username: session.user.username,
      exerciseName: exerciseName,
    }).sort({ dateOfExercise: -1 });

    if (exerciseHistory.length) {
      return {
        props: {
          username: session.user.username,
          exerciseName: exerciseName,
          exerciseHistory: exerciseHistory.map((exercise) => ({
            id: exercise._id.toString(),
            weightUsed: exercise.weightUsed,
            numberOfReps: exercise.numberOfReps,
            numberOfSets: exercise.numberOfSets,
            dateOfExercise: exercise.dateOfExercise.toDateString(),
          })),
        },
      };
    } else if (exerciseHistory) {
      return {
        props: {
          errorMessage:
            exerciseName +
            ` has not been tracked yet! Track this on the tracking page!`,
        },
      };
    } else {
      throw new Error("Exercise Not Found");
    }
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}

export default exerciseHistory;
