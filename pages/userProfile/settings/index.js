import { dbConnect } from "../../../lib/db-connect";
import Profile from "../../../models/userProfile";
import User from "../../../models/user";
import SettingsForm from "../../../components/forms/ProfilePageForms/SettingsForm";
import { useState } from "react";
import { getSession } from "next-auth/client";
import LighterDiv from "../../../components/ui/LighterDiv";
import { useRouter } from "next/router";

function ProfileView(props) {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  async function saveDescription(newDescription) {
    const description = {
      profileDescription: newDescription,
      username: props.user.username,
    };
    const response = await fetch("/api/profile/profile_description", {
      method: "PUT",
      body: JSON.stringify(description),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
      setSuccessMessage(null);
    } else {
      setSuccessMessage("Description Successfully Updated!");
      setErrorMessage(null);
    }
    router.push("/userProfile/settings");
  }

  return (
    <LighterDiv>
      {successMessage && (
        <p style={{ textTransform: "capitalize", color: "green" }}>
          {successMessage}
        </p>
      )}
      {errorMessage && (
        <p style={{ textTransform: "capitalize", color: "red" }}>
          {errorMessage}
        </p>
      )}
      <SettingsForm
        user={props.user}
        userprofile={props.userprofile}
        setErrorMessage={setErrorMessage}
        handleSaveDescription={saveDescription}
      />
    </LighterDiv>
  );
}

export async function getServerSideProps({ req }) {
  try {
    const session = await getSession({ req });
    if (!session) throw new Error("Session not Found");

    await dbConnect();

    const selectedUser = await User.findOne({
      username: session.user.username,
    });
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
    console.log(error);
    return {
      notFound: true,
    };
  }
}
export default ProfileView;
