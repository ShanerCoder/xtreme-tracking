import DarkerDiv from "../ui/DarkerDiv";
import LighterDiv from "../ui/LighterDiv";
import Card from "../ui/Card";
import classes from "./ProfileForm.module.css";
import { Col, Row } from "react-bootstrap";
import { useStore } from "../../context";
import { getValue } from "../../utils/common";

function ProfileForm(props) {
  const [state, dispatch] = useStore();
  const user = getValue(state, ["user"], null);
  let ownProfilePage = user.id == props.id;
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
                {props.forename} {props.surname}
              </h3>
            </Col>
            <Col xs={8}>
              <h2 className="center">{props.username}</h2>
              <p className={classes.profileDescription}>
                {props.profileDescription}
              </p>
              <Row className={classes.profileButtonsSection}>
                <Col xs={6}>
                  <button>SEND A PRIVATE MESSAGE</button>
                </Col>
                <Col xs={6}>
                  <button>REQUEST A CONSULTATION</button>
                </Col>
              </Row>
            </Col>
            {ownProfilePage ? <Col xs={1}>Own Page</Col> : <></>}
          </Row>
        </Card>
      </LighterDiv>
    </>
  );
}

export default ProfileForm;
