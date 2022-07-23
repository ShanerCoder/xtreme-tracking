import Head from "next/head";
import { getSession } from "next-auth/client";
import ExampleTrainingPlansSection from "../../../components/form-components/TrackingPage/ExampleTrainingPlansSection";
import { dbConnect } from "../../../lib/db-connect";
import ExampleTrainingPlansList from "../../../models/exerciseTracking/exampleTrainingPlan";
import LighterDiv from "../../../components/ui/LighterDiv";

function ExampleTrainingPlans(props) {
  return (
    <>
      <Head>
        <title>Example Training Plans</title>
        <meta
          name="Xtreme Tracking Example Training Plans Page"
          content="Example Training Plans can be viewed here!"
        />
      </Head>
      <LighterDiv>
        <h1 className="center">Example Training Plans</h1>
        <ExampleTrainingPlansSection
          trainingPlans={props.exampleTrainingPlans}
        />
      </LighterDiv>
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

    // Finds example training plans
    const exampleTrainingPlans = await ExampleTrainingPlansList.find({}).sort({
      trainingPlanName: 1,
    });

    // Returns example training plans
    return {
      props: {
        exampleTrainingPlans: exampleTrainingPlans.map((trainingPlan) => ({
          id: trainingPlan._id.toString(),
          trainingPlanName: trainingPlan.trainingPlanName,
          listOfExercises: trainingPlan.listOfExercises,
          numberOfExercises: trainingPlan.listOfExercises.length,
        })),
      },
    };
  } catch (error) {
    return {
      props: {
        errorMessage: "Make an account to view example training plans!",
      },
    };
  }
}

export default ExampleTrainingPlans;
