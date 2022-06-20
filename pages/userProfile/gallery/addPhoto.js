import { useStore } from "../../../context";
import { getValue } from "../../../utils/common";
import { useLoadingStore } from "../../../context/loadingScreen";
import { useState } from "react";
import { useRouter } from "next/router";
import LighterDiv from "../../../components/ui/LighterDiv";
import AddNewPhoto from "../../../components/form-components/Common/AddNewPhoto";

function AddPhotoToGallery() {
  const [state] = useStore();
  const user = getValue(state, ["user"], null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const router = useRouter();
  const [loadingScreen, showLoadingScreen] = useLoadingStore();

  async function addPhotoToGallery(postData) {
    showLoadingScreen({ type: true });
    setSuccessMessage(null);
    setErrorMessage(null);

    // Save Image
    const formData = new FormData();
    formData.append("file", postData.uploadData[0]);
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
    } else {
      // Save Photo to Gallery
      const bodyData = {
        username: user.username,
        photoId: uploadPhotoData.public_id,
        photoDescription: postData.photoDescription,
        privatePhoto: postData.privatePhoto,
      };
      const response = await fetch(
        "/api/account/account_profile/gallery",
        {
          method: "POST",
          body: JSON.stringify(bodyData),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (data.hasError) {
        setErrorMessage(data.errorMessage);
      } else {
        setSuccessMessage("Photo has been added to Gallery");
      }
    }
    await router.push("/userProfile/gallery/addPhoto");
    showLoadingScreen({ type: false });
  }

  return (
    <>
      {successMessage && <p className="successMessage">{successMessage}</p>}
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      <LighterDiv>
        <AddNewPhoto
          handleAddPhoto={addPhotoToGallery}
          title="Add Photo to Gallery"
          buttonText="Add Photo"
          photoDescription="Photo Description:"
          privatePublicToggle={true}
        />
      </LighterDiv>
    </>
  );
}

export default AddPhotoToGallery;
