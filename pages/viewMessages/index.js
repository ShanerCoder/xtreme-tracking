import Head from "next/head";
import ViewIncomingDetailsForm from "../../components/form-components/Common/ViewIncomingDetailsForm";
import LighterDiv from "../../components/ui/LighterDiv";
import { dbConnect } from "../../lib/db-connect";
import PrivateMessage from "../../models/accountProfile/privateMessage";
import { getSession } from "next-auth/client";

function ViewMessages(props) {
  const numberOfMessages = props.privateMessages.length;

  return (
    <>
      <Head>
        <title>Messages</title>
        <meta
          name="Xtreme Tracking Message Page"
          content="Browse any messages you have received here!"
        />
      </Head>
      <LighterDiv>
        <h2 className="center">Messages Page</h2>
        {numberOfMessages > 0 ? (
          <>
            <ViewIncomingDetailsForm
              incomingDetails={props.privateMessages}
              viewDetailURL={"/viewMessages/"}
              detailName={"Message"}
              clientDetailText={"Message sent from Username: "}
              dateTimeDetailText={"Message Sent: "}
            />
            <h3 className="center" style={{ paddingTop: "50px" }}>
              There are no more messages at this time.
            </h3>
          </>
        ) : (
          <h3 className="center" style={{ paddingTop: "100px" }}>
            You currently have no messages at this time. Please check again
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

    // Finds list of private messages
    const privateMessage = PrivateMessage.find();
    const filter = { usernameToReceive: session.user.username };
    const privateMessageList = await privateMessage
      .find(filter)
      .sort({ _id: -1 });

    // Returns list of private messages
    return {
      props: {
        privateMessages: privateMessageList.map((message) => ({
          id: message._id.toString(),
          username: message.usernameToReceive,
          usernameFrom: message.usernameWhoSent,
          dateCreated: message.createdAt.toString(),
        })),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default ViewMessages;
