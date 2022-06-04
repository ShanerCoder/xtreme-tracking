import { Col } from "react-bootstrap";
import classes from "./ButtonProfile.module.css";

function OneButtonProfile(props) {
  return (
    <>
      <Col xs={12} sm={12} className={classes.columnPadding}>
        <button onClick={props.handleButtonOne}>{props.buttonOneText}</button>
      </Col>
    </>
  );
}

export default OneButtonProfile;
