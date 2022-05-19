import Head from "next/head";
import ViewIncomingDetailsForm from "../../../components/form-components/Common/ViewIncomingDetailsForm";
import LighterDiv from "../../../components/ui/LighterDiv";
import { dbConnect } from "../../../lib/db-connect";
import ConsultationList from "../../../models/consultationList";
import { getSession } from "next-auth/client";

function ViewClientList(props) {
  const numberOfClients = props.clientList.length;

  return (
    <>
      <Head>
        <title>Clients List</title>
        <meta
          name="Xtreme Tracking Clients List Page"
          content="Browse a list of all your clients here!"
        />
      </Head>
      <LighterDiv>
        <h2 className="center">Clients List</h2>
        {numberOfClients > 0 ? (
          <>
            <ViewIncomingDetailsForm
              incomingDetails={props.clientList}
              viewMessageURL={"/messages/"}
              detailName={"Client"}
            />
            <h3 className="center" style={{ paddingTop: "50px" }}>
              You have no more clients at this time.
            </h3>
          </>
        ) : (
          <h3 className="center" style={{ paddingTop: "50px" }}>
            You currently have no clients at this time. Please check again
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

    const consultationList = ConsultationList.find();
    const filter = { personalTrainerUsername: session.user.username };
    const consultationListOfClients = await consultationList
      .find(filter)
      .sort({ _id: -1 });

    return {
      props: {
        clientList: consultationListOfClients.map((client) => ({
          id: client._id.toString(),
          usernameFrom: client.clientUsername,
          dateCreated: client.createdAt.toString(),
        })),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default ViewClientList;
