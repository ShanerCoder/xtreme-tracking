import Head from "next/head";
import ExerciseHistory from "../../../models/exerciseTracking/exerciseHistory";
import { getSession } from "next-auth/client";
import { dbConnect } from "../../../lib/db-connect";
import ExerciseHistorySection from "../../../components/forms/TrackingForm/ExerciseList/ExerciseHistory/ExerciseHistorySection";
import { useRouter } from "next/router";
import LighterDiv from "../../../components/ui/LighterDiv";
import { useLoadingStore } from "../../../context/loadingScreen";
import PageNavigators from "../../../components/form-components/Common/PageNavigators";

function exerciseHistory(props) {
  const router = useRouter();
  const [loadingScreen, showLoadingScreen] = useLoadingStore();

  async function handleNextPageNavigation() {
    showLoadingScreen({ type: true });
    await router.push(
      "/tracking/exerciseHistory/" +
        props.exerciseName +
        "?pageNumber=" +
        (Number(props.pageNumber) + Number(1))
    );
    showLoadingScreen({ type: false });
    window.scrollTo({
      bottom: 0,
      behavior: "smooth",
    });
  }

  async function handlePrevPageNavigation() {
    showLoadingScreen({ type: true });
    await router.push(
      "/tracking/exerciseHistory/" +
        props.exerciseName +
        "?pageNumber=" +
        (Number(props.pageNumber) - Number(1))
    );
    showLoadingScreen({ type: false });
    window.scrollTo({
      bottom: 0,
      behavior: "smooth",
    });
  }

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
        <PageNavigators
          pageNumber={props.pageNumber}
          handleNextPageNavigation={
            props.hasNextPage ? handleNextPageNavigation : null
          }
          handlePrevPageNavigation={
            props.hasPrevPage ? handlePrevPageNavigation : null
          }
        />
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

    // PAGINATION INFORMATION
    const pageNumber =
      context.query.pageNumber && context.query.pageNumber > 0
        ? context.query.pageNumber
        : 1;
    const paginateQuery = {
      username: username,
      exerciseName: exerciseName,
    };
    const paginateOptions = {
      page: pageNumber,
      limit: 4,
      collation: {
        locale: "en",
      },
      sort: { dateOfExercise: -1 },
    };

    const exerciseHistory = await ExerciseHistory.paginate(
      paginateQuery,
      paginateOptions
    );

    const hasNextPage = pageNumber < exerciseHistory.pages;
    const hasPrevPage = pageNumber > 1;
    // END OF PAGINATION INFORMATION

    if (exerciseHistory.docs.length) {
      return {
        props: {
          ownUsername: ownUsername,
          usernameOfExerciseHistory: username,
          exerciseName: exerciseName,
          exerciseHistory: exerciseHistory.docs.map((exercise) => ({
            id: exercise._id.toString(),
            weightUsed: exercise.weightUsed,
            numberOfReps: exercise.numberOfReps,
            numberOfSets: exercise.numberOfSets,
            dateOfExercise: exercise.dateOfExercise.toDateString(),
          })),
          pageNumber: pageNumber,
          hasNextPage: hasNextPage,
          hasPrevPage: hasPrevPage,
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
    return {
      notFound: true,
    };
  }
}

export default exerciseHistory;
