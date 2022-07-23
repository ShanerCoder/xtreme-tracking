import Head from "next/head";
import ViewIncomingDetailsForm from "../../../components/form-components/Common/ViewIncomingDetailsForm";
import LighterDiv from "../../../components/ui/LighterDiv";
import { dbConnect } from "../../../lib/db-connect";
import ClientList from "../../../models/personalTrainer/clientList";
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
              viewDetailURL={"/userProfile/viewClientList/"}
              detailName={"Client Details"}
              secondDetail={"Send Challenge"}
              secondDetailURL={"/userProfile/challenges/"}
              clientDetailText={"Client Username: "}
              dateTimeDetailText={"Client Since: "}
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

    // Finds client list
    const clientList = ClientList.find();
    const filter = { personalTrainerUsername: session.user.username };
    const ListOfClients = await clientList.find(filter).sort({ _id: -1 });

    // Returns list of clients
    return {
      props: {
        clientList: ListOfClients.map((client) => ({
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
