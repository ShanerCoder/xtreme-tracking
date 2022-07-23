import Head from "next/head";
import ViewIncomingDetailsForm from "../../../../components/form-components/Common/ViewIncomingDetailsForm";
import LighterDiv from "../../../../components/ui/LighterDiv";
import { dbConnect } from "../../../../lib/db-connect";
import Challenge from "../../../../models/exerciseTracking/challenge";
import { getSession } from "next-auth/client";

function ViewChallenges(props) {
  const numberOfChallenges = props.challenges.length;

  return (
    <>
      <Head>
        <title>Challenges</title>
        <meta
          name="Xtreme Tracking View Challenges Page"
          content="Browse any challenges you have received here!"
        />
      </Head>
      <LighterDiv>
        <h2 className="center">Challenges Page</h2>
        {numberOfChallenges > 0 ? (
          <>
            <ViewIncomingDetailsForm
              incomingDetails={props.challenges}
              viewDetailURL={"/userProfile/challenges/viewChallenges/"}
              detailName={"Challenge"}
              clientDetailText={"Challenge sent from Username: "}
              dateTimeDetailText={"Challenge Request Sent: "}
            />
            <h3 className="center" style={{ paddingTop: "50px" }}>
              There are no more challenges at this time.
            </h3>
          </>
        ) : (
          <h3 className="center" style={{ paddingTop: "100px" }}>
            You currently have no challenges at this time. Please check again
            later.
          </h3>
        )}
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

    const filter = {
      clientUsername: session.user.username,
      dateToAchieveBy: {
        $gte: new Date(),
      },
    };

    // Finds all challenges assigned to user
    const challengeList = await Challenge.find(filter).sort({ _id: -1 });

    // Returns all challenges assigned to user
    return {
      props: {
        challenges: challengeList.map((challenge) => ({
          id: challenge._id.toString(),
          usernameFrom: challenge.personalTrainerUsername,
          exerciseName: challenge.exerciseName,
          dateToAchieveBy: challenge.dateToAchieveBy.toString(),
          dateCreated: challenge.createdAt.toString(),
        })),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default ViewChallenges;
