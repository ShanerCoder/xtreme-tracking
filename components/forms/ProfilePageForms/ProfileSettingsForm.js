import Card from "../../ui/Card";
import classes from "./ProfileSettingsForm.module.css";
import { useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Image } from "cloudinary-react";
import AdditionalSetting from "../../form-components/ProfilePage/SettingsComponents/AdditionalSetting";

function ProfileForm(props) {
  const [imageSrc, setImageSrc] = useState(null);
  const [uploadData, setUploadData] = useState(null);
  const descriptionInputRef = useRef();

  // Function which handles the new description when the user attempts to save
  function handleSaveDescription() {
    const newDescription = descriptionInputRef.current.value;
    if (newDescription == props.userprofile.profileDescription) {
      props.setErrorMessage("Description is unchanged!");
      return;
    }
    props.setErrorMessage(null);
    props.handleSaveDescription(newDescription);
  }

  // Function which handles the new image when the user attempts to save
  function handleSaveImage() {
    if (uploadData) {
      props.handleSaveImage(uploadData);
      setUploadData(null);
    } else props.setErrorMessage("No image has been selected!");
  }

  return (
    <>
      <h1 className="center">Profile Settings</h1>
      <Card>
        <Row className={classes.rowPadding}>
          <Col xs={12} sm={3}>
            <Row>
              {!imageSrc ? (
                <Image
                  className={classes.profilePicture}
                  cloudName="multishane999"
                  publicId={props.userprofile.profilePictureId}
                />
              ) : (
                <img
                  src={imageSrc}
                  alt="Profile Picture Icon"
                  className={classes.profilePicture}
                />
              )}
            </Row>
            <Row>
              <Row>
                <input
                  type="file"
                  onChange={(event) => {
                    setImageSrc(URL.createObjectURL(event.target.files[0]));
                    setUploadData(event.target.files);
                  }}
                  className={classes.uploadImageInput}
                />
              </Row>
              <Row className="center">
                <button
                  onClick={handleSaveImage}
                  className={classes.changeProfilePictureButton}
                >
                  Change Profile Picture
                </button>
              </Row>
            </Row>
          </Col>
          <Col xs={12} sm={9}>
            <div className="control lowerWidth">
              <h4 className={classes.headingPadding}>
                Change Profile Description
              </h4>
              <textarea
                rows={8}
                defaultValue={props.userprofile.profileDescription}
                maxLength={800}
                ref={descriptionInputRef}
              />
              <div className="actions">
                <button
                  className={"lowerWidth " + classes.saveDescriptionButton}
                  onClick={handleSaveDescription}
                >
                  Save Description
                </button>
              </div>
            </div>
            <Row>
              <Col xs={12} lg={6}>
                <AdditionalSetting
                  label="Hide Weight on Check In:"
                  defaultChecked={props.userprofile.hideWeightOnCheckIn}
                  handleSubmit={props.handleUpdateWeightView}
                  buttonLabel="Update Profile"
                />
              </Col>
              <Col xs={12} lg={6}>
                <AdditionalSetting
                  label="Personal Trainer Profile:"
                  defaultChecked={props.userprofile.personalTrainerProfile}
                  handleSubmit={props.handleUpdatePersonalTrainerProfile}
                  buttonLabel="Update Profile"
                />
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={1}></Col>
        </Row>
      </Card>
    </>
  );
}

export default ProfileForm;
