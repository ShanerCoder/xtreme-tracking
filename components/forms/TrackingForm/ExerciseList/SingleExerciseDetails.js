import classes from "./SingleExerciseDetails.module.css";
import { Col, Row } from "react-bootstrap";

function SingleExerciseDetails(props) {
  return (
    <li key={props.exerciseName} className={classes.detailSection}>
      <div className={classes.detailBubble}>
        <Row className={classes.detailButtonsSection}>
          <Col xs={6} sm={6}>
            <label>{props.exerciseName}</label>
          </Col>
          <Col xs={6} sm={6}>
            <label>{props.muscleGroup}</label>
          </Col>
        </Row>
      </div>
    </li>
  );
}

export default SingleExerciseDetails;
