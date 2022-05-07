import { dbConnect } from "../../../lib/db-connect";
import User from "../../../models/user";
import MessageForm from "../../../components/forms/MessageForm";

function ProfileView(props) {
  function submitHandler(messageData) {
    console.log(messageData);
  }

  return (
    <>
      <MessageForm
        username={props.user.username}
        forename={props.user.forename}
        surname={props.user.surname}
        messageTitle={"Sending a Message to: " + props.user.username}
        messageSubject={"Write your Message Here:"}
        submitHandler={submitHandler}
      />
    </>
  );
}

export async function getStaticPaths() {
  await dbConnect();
  let user = User.find();
  const filter = {};
  const userprofileList = await user.find(filter).select("username");

  return {
    fallback: "blocking",
    paths: userprofileList.map((user) => ({
      params: {
        username: user.username.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const username = context.params.username;
  await dbConnect();

  try {
    const usernameFilter = { username: username };
    const selectedUser = await User.findOne(usernameFilter);
    return {
      props: {
        user: {
          id: selectedUser.id,
          username: selectedUser.username,
          forename: selectedUser.forename,
          surname: selectedUser.surname,
        },
      },
    };
  } catch (exception) {
    return {
      notFound: true,
    };
  }
}
export default ProfileView;
