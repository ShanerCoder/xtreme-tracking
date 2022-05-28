import classes from "./ExerciseDetails.module.css";
import { Col, Row } from "react-bootstrap";

function ExerciseDetails(props) {
  return (
    <li key={props.id} className={classes.detailSection}>
      <div className={classes.detailBubble}>
        <Row className={classes.detailButtonsSection}>
          <Col xs={12} sm={3}>
            <label>{props.exerciseName}</label>
          </Col>
          <Col xs={12} sm={2}>
            <label>{props.weightUsed}kg</label>
          </Col>
          <Col xs={12} sm={2}>
            <label>{props.numberOfReps} reps</label>
          </Col>
          <Col xs={12} sm={2}>
            <label>{props.numberOfSets} sets</label>
          </Col>
          <Col className={classes.columnPadding} xs={12} sm={3}>
            <button
              onClick={() => {
                props.removeExercise(props.id);
              }}
            >
              Remove Exercise
            </button>
          </Col>
        </Row>
      </div>
    </li>
  );
}

export default ExerciseDetails;
