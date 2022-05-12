import DarkerDiv from "../../ui/DarkerDiv";
import LighterDiv from "../../ui/LighterDiv";
import Card from "../../ui/Card";
import classes from "./ProfileForm.module.css";
import { Col, Row } from "react-bootstrap";
import { useStore } from "../../../context";
import { getValue } from "../../../utils/common";
import { useRouter } from "next/router";
import Link from "next/link";

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
        <Card>
          <Row>
            <Col>
              <img
                src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                className={classes.profilePicture}
              />
              <h3 className="center">
                {props.user.forename} {props.user.surname}
              </h3>
            </Col>
            <Col xs={12} sm={8}>
              <h2 className="center">{props.user.username}</h2>
              <p className={classes.profileDescription}>
                {props.userprofile.profileDescription}
              </p>
              <Row className={classes.profileButtonsSection}>
                {!ownProfilePage && (
                  <Col>
                    <button onClick={handlePrivateMessage}>
                      Send A Private Message
                    </button>
                  </Col>
                )}
                <Col>
                  <button>COMING NOT AS SOON</button>
                </Col>
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
