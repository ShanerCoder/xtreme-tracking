import { Col } from "react-bootstrap";
import classes from "./ButtonProfile.module.css"

function FourButtonProfile(props) {
  return (
    <>
      <Col xs={12} sm={6} className={classes.columnPadding}>
        <button onClick={props.handleButtonOne}>
          {props.buttonOneText}
        </button>
      </Col>
      <Col xs={12} sm={6} className={classes.secondButtonPadding}>
        <button onClick={props.handleButtonTwo}>
          {props.buttonTwoText}
        </button>
      </Col>
      <Col xs={12} sm={6} className={classes.columnPadding}>
        <button onClick={props.handleButtonThree}>{props.buttonThreeText}</button>
      </Col>
      <Col xs={12} sm={6}>
        <button onClick={props.handleButtonFour}>{props.buttonFourText}</button>
      </Col>
    </>
  );
}

export default FourButtonProfile;
