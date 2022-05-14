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

  async function saveImage(newImage) {
    const formData = new FormData();
    formData.append("file", newImage[0]);
    formData.append("upload_preset", "xtreme_tracking_preset");
    const uploadPhotoResponse = await fetch(
      "https://api.cloudinary.com/v1_1/multishane999/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const uploadPhotoData = await uploadPhotoResponse.json();
    if (uploadPhotoData.hasError) {
      setErrorMessage(uploadPhotoData.errorMessage);
      setSuccessMessage(null);
    } else {
      const newPhoto = {
        profilePictureId: uploadPhotoData.public_id,
        username: props.user.username,
      };

      const setPhotoResponse = await fetch("/api/profile/profile_image", {
        method: "PUT",
        body: JSON.stringify(newPhoto),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const setPhotoData = await setPhotoResponse.json();
      if (setPhotoData.hasError) {
        setErrorMessage(setPhotoData.errorMessage);
        setSuccessMessage(null);
      } else {
        setSuccessMessage("Profile Picture Successfully Updated!");
        setErrorMessage(null);
      }
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
        handleSaveImage={saveImage}
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
    console.log(error);
    return {
      notFound: true,
    };
  }
}
export default ProfileView;
