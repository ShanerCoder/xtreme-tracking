import Card from "../../ui/Card";
import classes from "./ProfileSettingsForm.module.css";
import { useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Image } from "cloudinary-react";

function ProfileForm(props) {
  const [imageSrc, setImageSrc] = useState(null);
  const [uploadData, setUploadData] = useState(null);
  const descriptionInputRef = useRef();

  function handleSaveDescription() {
    const newDescription = descriptionInputRef.current.value;
    if (newDescription == props.userprofile.profileDescription) {
      props.setErrorMessage("Description is unchanged!");
      return;
    }
    props.setErrorMessage(null);
    props.handleSaveDescription(newDescription);
  }

  function handleSaveImage() {
    if (uploadData) {
      props.handleSaveImage(uploadData);
      setUploadData(null);
    } else props.setErrorMessage("No image has been selected!");
  }

  return (
    <>
      <Card>
        <h2 className={classes.headingPadding}>Profile Settings</h2>
        <Row className={classes.rowPadding}>
          <Col>
            <Row>
              {!imageSrc ? (
                <Image
                  className={classes.profilePicture}
                  cloudName="multishane999"
                  publicId={props.userprofile.profilePictureId}
                />
              ) : (
                <img src={imageSrc} className={classes.profilePicture} />
              )}
            </Row>
            <Row>
              <>
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
              </>
            </Row>
          </Col>
          <Col xs={12} sm={8}>
            <div className={classes.actions}>
              <h4 className={classes.headingPadding}>
                Change Profile Description
              </h4>
              <textarea
                rows={8}
                defaultValue={props.userprofile.profileDescription}
                maxLength={800}
                ref={descriptionInputRef}
              />
              <button onClick={handleSaveDescription}>Save Description</button>
            </div>
            <Row className={classes.additionalProfileSettings}>
              <h2>SOONISH</h2>
            </Row>
          </Col>
          <Col xs={12} sm={1}></Col>
        </Row>
      </Card>
    </>
  );
}

export default ProfileForm;