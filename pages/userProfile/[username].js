import { dbConnect } from "../../lib/db-connect";
import Profile from "../../models/userProfile";
import User from "../../models/user";
import ProfileForm from "../../components/forms/ProfilePageForms/ProfileForm";
import GenerateProfileForm from "../../components/forms/ProfilePageForms/ProfileGenerationForm";
import { useRouter } from "next/router";
import { useState } from "react";

function ProfileView(props) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);

  async function generateProfile() {
    const newUserProfile = {
      username: props.user.username,
      personalTrainerProfile: false,
    };
    const userProfileResponse = await fetch(
      "/api/account/account_creation/user_profile",
      {
        method: "POST",
        body: JSON.stringify(newUserProfile),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const userProfileData = await userProfileResponse.json();

    if (userProfileData.hasError) {
      setErrorMessage(userProfileData.errorMessage);
      if (userProfileData.errorMessage == "This ID already has a profile!") {
        router.push("/userProfile/" + props.user.username);
      }
    } else {
      setErrorMessage(null);
      router.push("/userProfile/" + props.user.username);
    }
  }

  return (
    <>
      {!props.userprofile ? (
        <>
          {errorMessage && (
            <p style={{ textTransform: "capitalize", color: "red" }}>
              {errorMessage}
            </p>
          )}
          <GenerateProfileForm
            username={props.user.username}
            handleGeneration={generateProfile}
          />
        </>
      ) : (
        <ProfileForm user={props.user} userprofile={props.userprofile} />
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  // Connecting to DB to find User & User Profile
  let selectedUser;
  try {
    const username = context.query.username;
    await dbConnect();

    const usernameFilter = { username: username };
    selectedUser = await User.findOne(usernameFilter);
    const userId = selectedUser.id;
    const selectedProfile = await Profile.findOne({ _id: userId });
    if (
      !selectedProfile.profilePictureId &&
      (selectedProfile.profilePictureId =
        process.env.DEFAULT_PROFILE_PICTURE_ID)
    );
    return {
      // Returns User and Profile details
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
          personalTrainerProfile: selectedProfile.personalTrainerProfile,
        },
      },
    };
  } catch (error) {
    if (selectedUser) {
      // Returns user details if profile doesn't exist
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
    }
    // Returns 'Page Doesn't Exist' if user does not exist
    return {
      notFound: true,
    };
  }
}
export default ProfileView;
