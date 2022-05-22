import classes from "./UserIcon.module.css";
import { Image } from "cloudinary-react";
import { useState } from "react";
import React from "react";
import Link from "next/link";

function UserIcon(props) {
  const [profilePictureId, setProfilePictureId] = useState(null);

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
    <Link href={`/userProfile/${props.username}`}>
      <Image
        className={classes.userIcon}
        cloudName="multishane999"
        publicId={profilePictureId}
      />
    </Link>
  );
}

export default UserIcon;
