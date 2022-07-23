import classes from "./IndividualGalleryPhoto.module.css";
import { Image } from "cloudinary-react";
import { useState } from "react";

function IndividualGalleryPhoto(props) {
  const [removeButtonText, setRemoveButtonText] = useState("Remove Photo");
  let confirmDelete = false;

  // Function to update viewing privacy of a photo
  function handleUpdatePrivacy() {
    const postData = {
      id: props.id,
      privatePhoto: !props.privatePhoto,
    };
    props.handleUpdatePrivacyOfPhoto(postData);
  }

  // Function that occurs when remove photo button is pressed
  function handleRemovePhotoButton() {
    if (!confirmDelete) {
      confirmDelete = true;
      setRemoveButtonText("Click twice to confirm removal of this photo.");
    } else {
      props.handleRemovePhoto(props.id);
      confirmDelete = false;
    }
  }

  return (
    <>
      <div>
        <p className="center">{props.createdAt}</p>
        <Image
          className={classes.galleryPhoto}
          cloudName="multishane999"
          publicId={props.photoId}
        />
      </div>
      <div className={"center " + classes.postBubble}>
        <p>{props.photoDescription}</p>
      </div>

      {props.handleUpdatePrivacyOfPhoto && (
        <button
          className="lowerWidth"
          style={{ marginBottom: "25px", marginTop: "-10px" }}
          onClick={handleUpdatePrivacy}
        >
          {props.privatePhoto ? "Private Photo" : "Public Photo"}
        </button>
      )}

      {props.handleRemovePhoto && (
        <button
          className="lowerWidth"
          style={{ marginBottom: "25px", marginTop: "-10px" }}
          onClick={handleRemovePhotoButton}
        >
          {removeButtonText}
        </button>
      )}
    </>
  );
}

export default IndividualGalleryPhoto;
