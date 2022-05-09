import { dbConnect } from "../../lib/db-connect";
import Profile from "../../models/userProfile";
import User from "../../models/user";
import ProfileForm from "../../components/forms/ProfileForm";

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

export async function getServerSideProps(context) {
  try {
    const username = context.query.username;
    await dbConnect();

    const usernameFilter = { username: username };
    const selectedUser = await User.findOne(usernameFilter);
    const userId = selectedUser.id;
    const selectedProfile = await Profile.findOne({ _id: userId });
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
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
export default ProfileView;
