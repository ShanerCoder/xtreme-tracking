import ViewMessagesForm from "../../components/forms/MessagesForm/ViewMessagesForm";
import LighterDiv from "../../components/ui/LighterDiv";
import { useRouter } from "next/router";
import { dbConnect } from "../../lib/db-connect";
import PrivateMessage from "../../models/privateMessage";
import Cryptr from "cryptr";
import { getSession } from "next-auth/client";

function SocialPage(props) {
  const router = useRouter();
  const numberOfMessages = props.privateMessages.length;

  return (
    <>
      <LighterDiv>
        <h2 className="center">Messages Page</h2>
        {numberOfMessages > 0 ? (
          <>
            <ViewMessagesForm privateMessages={props.privateMessages} />
            <h3 className="center" style={{ paddingTop: "100px" }}>
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
  // fetch data from an API
  try {
    const session = await getSession({ req });
    if (!session) {
      throw new Error("Session not found");
    }

    await dbConnect();

    const cryptr = new Cryptr(process.env.SECRET_KEY);
    const privateMessage = PrivateMessage.find();
    const filter = { usernameToReceive: session.user.username };
    //const filter = { usernameToReceive: "edison" };
    const privateMessageList = await privateMessage
      .find(filter)
      .sort({ _id: -1 });

    return {
      props: {
        privateMessages: privateMessageList.map((message) => ({
          id: message._id.toString(),
          username: message.usernameToReceive,
          usernameFrom: message.usernameWhoSent,
          //privateMessage: cryptr.decrypt(message.privateMessage),
          dateCreated: message.createdAt.toString(),
        })),
      },
    };
  } catch (error) {
    return {
      props: {
        privateMessage: {
          error: true,
        },
      },
    };
  }
}

export default SocialPage;
