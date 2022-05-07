import { dbConnect } from "../../lib/db-connect";
import Profile from "../../models/userProfile";
import User from "../../models/user";
import ProfileForm from "../../components/forms/ProfileForm";
import { errorHandler } from "../../utils/common";

function ProfileView(props) {
  return (
    <>
      <ProfileForm
        id={props.user.id}
        username={props.user.username}
        forename={props.user.forename}
        surname={props.user.surname}
        profilePictureURL={props.userprofile.profilePictureURL}
        profileDescription={props.userprofile.profileDescription}
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
    const profileFilter = { id: selectedUser.id };
    const selectedProfile = await Profile.findOne(profileFilter);
    return {
      props: {
        user: {
          id: selectedUser.id,
          username: selectedUser.username,
          forename: selectedUser.forename,
          surname: selectedUser.surname,
        },
        userprofile: {
          profilePictureURL: selectedProfile.profilePictureURL,
          profileDescription: selectedProfile.profileDescription,
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
