import Head from "next/head";
import ExerciseHistory from "../../../models/exerciseTracking/exerciseHistory";
import { getSession } from "next-auth/client";
import { dbConnect } from "../../../lib/db-connect";
import ExerciseHistorySection from "../../../components/forms/TrackingForm/ExerciseList/ExerciseHistory/ExerciseHistorySection";
import { useRouter } from "next/router";
import LighterDiv from "../../../components/ui/LighterDiv";
import { useLoadingStore } from "../../../context/loadingScreen";

function exerciseHistory(props) {
  const router = useRouter();
  const [loadingScreen, showLoadingScreen] = useLoadingStore();

  async function handleRemoveExerciseRecord(exerciseRecordId) {
    showLoadingScreen({ type: true });
    const bodyData = {
      exerciseRecordId: exerciseRecordId,
      username: props.ownUsername,
    };

    const response = await fetch("/api/exerciseTracking/exercise_history", {
      method: "DELETE",
      body: JSON.stringify(bodyData),
      headers: { "Content-Type": "application/json" },
    });
    await response.json();
    await router.push("/tracking/exerciseHistory/" + props.exerciseName);
    showLoadingScreen({ type: false });
  }

  return props.errorMessage ? (
    <>
      <Head>
        <title>Exercise Not Tracked</title>
        <meta
          name="Xtreme Tracking Exercise Not Tracked Page"
          content="Information about an exercise not being tracked can be viewed here!"
        />
      </Head>
      <h2 className="center" style={{ paddingTop: "20px" }}>
        {props.errorMessage}
      </h2>
    </>
  ) : (
    <>
      <Head>
        <title>{props.exerciseName} Tracking Page</title>
        <meta
          name="Selected Exercise Tracking Page"
          content="Browse the history of a selected exercise here!"
        />
      </Head>
      <LighterDiv>
        <h1 className="center">
          Viewing {props.usernameOfExerciseHistory}'s Exercise History
        </h1>
        {props.ownUsername &&
        props.ownUsername == props.usernameOfExerciseHistory ? (
          <ExerciseHistorySection
            exerciseName={props.exerciseName}
            exerciseHistory={props.exerciseHistory}
            removeExerciseRecord={handleRemoveExerciseRecord}
          />
        ) : (
          <ExerciseHistorySection
            exerciseName={props.exerciseName}
            exerciseHistory={props.exerciseHistory}
          />
        )}
      </LighterDiv>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const exerciseName = context.query.exerciseName;
    let username = context.query.username;
    let ownUsername = null;
    const req = context.req;
    const session = await getSession({ req });
    await dbConnect();

    if (!username && session) username = session.user.username;
    if (session) ownUsername = session.user.username;
    if (!username) throw new Error("No Username");
    const exerciseHistory = await ExerciseHistory.find({
      username: username,
      exerciseName: exerciseName,
    }).sort({ dateOfExercise: -1 });

    if (exerciseHistory.length) {
      return {
        props: {
          ownUsername: ownUsername,
          usernameOfExerciseHistory: username,
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
