import { dbConnect } from "../../../lib/db-connect";
import classes from "../../PageStyling.module.css";
import Cryptr from "cryptr";
import PrivateMessage from "../../../models/privateMessage";
import { getSession } from "next-auth/client";
import LighterDiv from "../../../components/ui/LighterDiv";
import ViewSelectedMessageForm from "../../../components/forms/MessagesForm/ViewSelectedMessageForm";

function selectedMessage(props) {
  //console.log({ props });
  return (
    <>
      <LighterDiv>
        <h2 className={(classes.padding_top, "center")}>
          Viewing {props.privateMessage.usernameFrom}'s Message
        </h2>
        <ViewSelectedMessageForm privateMessage={props.privateMessage} />
      </LighterDiv>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const privateMessageId = context.query.privateMessageId;
    const req = context.req;
    const session = await getSession({ req });
    if (!session) {
      throw new Error("Session not found");
    }
    const user = session.user.username;

    await dbConnect();
    const cryptr = new Cryptr(process.env.SECRET_KEY);

    const filter = { _id: privateMessageId };
    const message = await PrivateMessage.findOne(filter);

    if (user == message.usernameToReceive)
      return {
        props: {
          privateMessage: {
            id: message._id.toString(),
            username: message.usernameToReceive,
            usernameFrom: message.usernameWhoSent,
            privateMessage: cryptr.decrypt(message.privateMessage),
            dateCreated: message.createdAt.toString(),
          },
        },
      };
    else
      return {
        notFound: true,
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
export default selectedMessage;
