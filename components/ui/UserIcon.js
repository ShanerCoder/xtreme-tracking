import classes from "./UserIcon.module.css";
import { Image } from "cloudinary-react";
import { useState } from "react";
import React from "react";
import { useLoadingStore } from "../../context/loadingScreen";
import { useRouter } from "next/router";

function UserIcon(props) {
  const router = useRouter();
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  const [profilePictureId, setProfilePictureId] = useState(null);

  async function handleLoader(URL) {
    showLoadingScreen({ type: true });
    await router.push(URL);
    showLoadingScreen({ type: false });
  }

  React.useEffect(() => {
    const response = fetch(
      "/api/account/account_profile/profile_image?username=" + props.username,
      {
        method: "GET",
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        if (data.hasError) setProfilePictureId(data.errorMessage);
        else setProfilePictureId(data.body);
      });
  }, []);

  return (
    <div
      onClick={() => {
        handleLoader("/userProfile/" + props.username);
      }}
    >
      {props.navigation ? (
        <Image
          style={{ maxWidth: "50px", maxHeight: "50px" }}
          className={classes.userIcon}
          cloudName="multishane999"
          publicId={profilePictureId}
        />
      ) : (
        <Image
          className={classes.userIcon}
          cloudName="multishane999"
          publicId={profilePictureId}
        />
      )}
    </div>
  );
}

export default UserIcon;
