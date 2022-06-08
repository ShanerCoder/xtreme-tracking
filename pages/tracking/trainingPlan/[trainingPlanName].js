import TrainingPlan from "../../../models/trainingPlan";
import { getSession } from "next-auth/client";
import { dbConnect } from "../../../lib/db-connect";

function TrainingPlanPage(props) {
  return <h1>Test</h1>;
}

export async function getServerSideProps(context) {
  try {
    const trainingPlanName = context.query.trainingPlanName;
    let username = context.query.username;
    let ownUsername = null;
    const req = context.req;
    const session = await getSession({ req });
    await dbConnect();

    if (!username && session) username = session.user.username;
    if (session) ownUsername = session.user.username;
    if (!username) throw new Error("No Username");
    const trainingPlan = await TrainingPlan.findOne({
      username: username,
      trainingPlanName: trainingPlanName,
    });

    if (trainingPlan) {
      return {
        props: {
          id: trainingPlan._id.toString(),
          ownUsername: ownUsername,
          username: trainingPlan.username,
          trainingPlanName: trainingPlan.trainingPlanName,
          listOfExercises: trainingPlan.listOfExercises,
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
