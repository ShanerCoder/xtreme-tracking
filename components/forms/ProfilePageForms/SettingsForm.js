import Card from "../../ui/Card";
import classes from "./SettingsForm.module.css";
import { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";

function ProfileForm(props) {
  const router = useRouter();
  const descriptionInputRef = useRef();

  function handleSaveDescription() {
    const newDescription = descriptionInputRef.current.value;
    if (newDescription == props.userprofile.profileDescription) {
      props.setErrorMessage("Description is unchanged!");
      return;
    }
    props.setErrorMessage(null);
    props.handleSaveDescription(newDescription);
    //router.push("/userProfile/" + props.user.username);
  }

  return (
    <>
      <Card>
        <Row>
          <Col>
            <img
              src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
              className={classes.profilePicture}
            />
            {
              <>
                <Row>
                  <Col xs={4}>
                    <button className={classes.browseFilesButton}>
                      Browse...
                    </button>
                  </Col>
                  <Col xs={8}>
                    <input
                      type="text"
                      readOnly={true}
                      defaultValue="No File Selected"
                      className={classes.uploadedFileText}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <button className={classes.changeProfilePictureButton}>
                      COMING WHEN IDK
                    </button>
                  </Col>
                </Row>
              </>
              // Upload Photo Functionality Here
            }
          </Col>
          <Col xs={12} sm={8}>
            <div className={classes.actions}>
              <h2 className="center">Profile Settings</h2>
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
