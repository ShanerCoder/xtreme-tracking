import { Col } from "react-bootstrap";
import classes from "./ButtonProfile.module.css"

function FiveButtonProfile(props) {
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
      <Col xs={12} sm={6} className={classes.secondButtonPadding}>
        <button onClick={props.handleButtonFour}>{props.buttonFourText}</button>
      </Col>
      <Col xs={12}>
        <button onClick={props.handleButtonFive}>{props.buttonFiveText}</button>
      </Col>
    </>
  );
}

export default FiveButtonProfile;
