import Card from "../../ui/Card";
import classes from "./ProfileForm.module.css";
import { Col, Row } from "react-bootstrap";
import { useStore } from "../../../context";
import { getValue } from "../../../utils/common";
import { useRouter } from "next/router";
import ProfileImageAndName from "../../form-components/ProfilePage/ProfileComponents/ProfileImageAndName";
import FourButtonProfile from "../../form-components/ProfilePage/ProfileComponents/FourButtonProfile";
import ThreeButtonProfile from "../../form-components/ProfilePage/ProfileComponents/ThreeButtonProfile";
import TwoButtonProfile from "../../form-components/ProfilePage/ProfileComponents/TwoButtonProfile";
import OneButtonProfile from "../../form-components/ProfilePage/ProfileComponents/OneButtonProfile";
import { useLoadingStore } from "../../../context/loadingScreen";

function ProfileForm(props) {
  const router = useRouter();
  const [state] = useStore();
  const [loadingScreen, showLoadingScreen] = useLoadingStore();

  const user = getValue(state, ["user"], null);
  let ownProfilePage = user.id == props.user.id;

  async function handleLoader(URL) {
    showLoadingScreen({ type: true });
    await router.push(URL);
    showLoadingScreen({ type: false });
  }

  function handlePrivateMessage() {
    handleLoader("/userProfile/privateMessage/" + props.user.username);
  }

  function handleConsultationRequest() {
    handleLoader("/userProfile/requestConsultation/" + props.user.username);
  }

  function handleViewConsultationRequests() {
    handleLoader("/userProfile/viewConsultationRequests/");
  }

  function handleViewConsultationSchedule() {
    handleLoader("/userProfile/viewConsultationSchedule/");
  }

  function handleViewClients() {
    handleLoader("/userProfile/viewClientList/");
  }

  function handleViewMessages() {
    handleLoader("/viewMessages/");
  }

  function handleViewChallenges() {
    handleLoader("/userProfile/challenges/viewChallenges/");
  }

  return (
    <>
      <h2 className="center">{props.user.username.toLowerCase()}'s Profile</h2>
      <Card>
        <Row>
          <Col>
            <ProfileImageAndName
              pictureId={props.userprofile.profilePictureId}
              forename={props.user.forename}
              surname={props.user.surname}
              streakCount={props.user.streakCount}
            />
          </Col>
          <Col xs={12} sm={8}>
            <p className={classes.profileDescription}>
              {props.userprofile.profileDescription}
            </p>
            <Row className={classes.profileButtonsSection}>
              {
                //Viewing a personal trainer profile
              }
              {!ownProfilePage && props.userprofile.personalTrainerProfile && (
                <TwoButtonProfile
                  handleButtonOne={handlePrivateMessage}
                  buttonOneText={"Send A Private Message"}
                  handleButtonTwo={handleConsultationRequest}
                  buttonTwoText={"Request A Consultation"}
                />
              )}
              {
                //Viewing your own profile, as a personal trainer
              }
              {ownProfilePage && props.userprofile.personalTrainerProfile && (
                <FourButtonProfile
                  handleButtonOne={handleViewConsultationRequests}
                  buttonOneText={"View Incoming Consultation Requests"}
                  handleButtonTwo={handleViewConsultationSchedule}
                  buttonTwoText={"View Consultation Schedule"}
                  handleButtonThree={handleViewClients}
                  buttonThreeText={"View List of Clients"}
                  handleButtonFour={handleViewChallenges}
                  buttonFourText={"View Challenges Assigned"}
                />
              )}
              {
                //Viewing your own profile, as a client user
              }
              {ownProfilePage && !props.userprofile.personalTrainerProfile && (
                <TwoButtonProfile
                  handleButtonOne={handleViewMessages}
                  buttonOneText={"View Messages"}
                  handleButtonTwo={handleViewChallenges}
                  buttonTwoText={"View Challenges Assigned"}
                />
              )}
              {
                //Viewing a client user profile
              }
              {!ownProfilePage && !props.userprofile.personalTrainerProfile && (
                <OneButtonProfile
                  handleButtonOne={handlePrivateMessage}
                  buttonOneText={"Send A Private Message"}
                />
              )}
            </Row>
          </Col>
          {
            //Settings option if viewing your own profile page
          }
          {ownProfilePage && (
            <Col xs={12} sm={1}>
              <div className={classes.profileSettingsDiv}>
                <div
                  onClick={() => {
                    handleLoader("/userProfile/settings");
                  }}
                >
                  <img
                    className={classes.profileSettingsButton}
                    src="/icons/gear.png"
                  />
                </div>
              </div>
            </Col>
          )}
        </Row>
      </Card>
    </>
  );
}

export default ProfileForm;
