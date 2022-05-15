import LighterDiv from "../../ui/LighterDiv";
import Card from "../../ui/Card";
import classes from "./ProfileForm.module.css";
import { Col, Row } from "react-bootstrap";
import { useStore } from "../../../context";
import { getValue } from "../../../utils/common";
import { useRouter } from "next/router";
import Link from "next/link";
import { Image } from "cloudinary-react";

function ProfileForm(props) {
  const router = useRouter();
  const [state] = useStore();
  const user = getValue(state, ["user"], null);
  let ownProfilePage = user.id == props.user.id;

  function handlePrivateMessage() {
    router.push("/userProfile/privateMessage/" + props.user.username);
  }

  return (
    <>
      <LighterDiv>
        <h2 className="center">{props.user.username}'s Profile</h2>
        <Card>
          <Row>
            <Col>
              <Row>
                <Image
                  className={classes.profilePicture}
                  cloudName="multishane999"
                  publicId={props.userprofile.profilePictureId}
                />
              </Row>
              <Row>
                <h3 className="center">
                  {props.user.forename} {props.user.surname}
                </h3>
              </Row>
            </Col>
            <Col xs={12} sm={8}>
              <p className={classes.profileDescription}>
                {props.userprofile.profileDescription}
              </p>
              <Row className={classes.profileButtonsSection}>
                {!ownProfilePage && props.userprofile.personalTrainerProfile && (
                  <>
                    <Col xs={12} sm={6} className={classes.columnPadding}>
                      <button onClick={handlePrivateMessage}>
                        Send A Private Message
                      </button>
                    </Col>
                    <Col xs={12} sm={6}>
                      <button>Request A Consultation</button>
                    </Col>
                  </>
                )}
                {ownProfilePage && props.userprofile.personalTrainerProfile && (
                  <>
                    <Col xs={12} sm={6} className={classes.columnPadding}>
                      <button onClick={handlePrivateMessage}>
                        View Incoming Consultation Requests
                      </button>
                    </Col>
                    <Col xs={12} sm={6}>
                      <button>View Consultation Schedule</button>
                    </Col>
                  </>
                )}
                {!ownProfilePage && !props.userprofile.personalTrainerProfile && (
                  <>
                    <Col xs={12} sm={12} className={classes.columnPadding}>
                      <button onClick={handlePrivateMessage}>
                        Send A Private Message
                      </button>
                    </Col>
                  </>
                )}
              </Row>
            </Col>
            {ownProfilePage ? (
              <Col xs={12} sm={1}>
                <div className={classes.profileSettingsDiv}>
                  <Link href="/userProfile/settings/">
                    <img
                      className={classes.profileSettingsButton}
                      src="/icons/gear.png"
                    />
                  </Link>
                </div>
              </Col>
            ) : (
              <></>
            )}
          </Row>
        </Card>
      </LighterDiv>
    </>
  );
}

export default ProfileForm;
