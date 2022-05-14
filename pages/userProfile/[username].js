import { dbConnect } from "../../lib/db-connect";
import Profile from "../../models/userProfile";
import User from "../../models/user";
import ProfileForm from "../../components/forms/ProfilePageForms/ProfileForm";

function ProfileView(props) {
  return (
    <>
      <ProfileForm user={props.user} userprofile={props.userprofile} />
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
    if (
      !selectedProfile.profilePictureId &&
      (selectedProfile.profilePictureId =
        process.env.DEFAULT_PROFILE_PICTURE_ID)
    );
    return {
      props: {
        user: {
          id: selectedUser.id,
          username: selectedUser.username,
          forename: selectedUser.forename,
          surname: selectedUser.surname,
        },
        userprofile: {
          profilePictureId: selectedProfile.profilePictureId,
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
