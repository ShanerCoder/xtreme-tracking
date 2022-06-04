import { Col } from "react-bootstrap";
import classes from "./ButtonProfile.module.css";

function ThreeButtonProfile(props) {
  return (
    <>
      <Col xs={12} sm={6} className={classes.columnPadding}>
        <button onClick={props.handleButtonOne}>{props.buttonOneText}</button>
      </Col>
      <Col xs={12} sm={6} className={classes.secondButtonPadding}>
        <button onClick={props.handleButtonTwo}>{props.buttonTwoText}</button>
      </Col>
      <Col xs={12} sm={12} className={classes.columnPadding}>
        <button onClick={props.handleButtonThree}>
          {props.buttonThreeText}
        </button>
      </Col>
    </>
  );
}

export default ThreeButtonProfile;
