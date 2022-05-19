import Head from "next/head";
import ViewIncomingDetailsForm from "../../../components/form-components/Common/ViewIncomingDetailsForm";
import LighterDiv from "../../../components/ui/LighterDiv";
import { dbConnect } from "../../../lib/db-connect";
import ConsultationRequest from "../../../models/consultationRequest";
import { getSession } from "next-auth/client";

function ViewConsultationRequests(props) {
  const numberOfRequests = props.consultationRequests.length;

  return (
    <>
      <Head>
        <title>Incoming Consultation Requests</title>
        <meta
          name="Xtreme Tracking Consultation Requests Page"
          content="Browse any consultation requests you have received here!"
        />
      </Head>
      <LighterDiv>
        <h2 className="center">Consultation Requests</h2>
        {numberOfRequests > 0 ? (
          <>
            <ViewIncomingDetailsForm
              incomingDetails={props.consultationRequests}
              viewMessageURL={"/userProfile/viewConsultationRequests/"}
              detailName={"Consultation Request"}
            />
            <h3 className="center" style={{ paddingTop: "50px" }}>
              There are no more consultation requests at this time.
            </h3>
          </>
        ) : (
          <h3 className="center" style={{ paddingTop: "50px" }}>
            You currently have no consultation requests at this time. Please
            check again later.
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

    const consultationRequest = ConsultationRequest.find();
    const filter = { usernameToReceive: session.user.username };
    const consultationRequestList = await consultationRequest
      .find(filter)
      .sort({ _id: -1 });

    return {
      props: {
        consultationRequests: consultationRequestList.map((request) => ({
          id: request._id.toString(),
          username: request.usernameToReceive,
          usernameFrom: request.usernameWhoSent,
          dateCreated: request.createdAt.toString(),
        })),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default ViewConsultationRequests;
