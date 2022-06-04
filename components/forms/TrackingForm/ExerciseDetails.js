import classes from "./ExerciseDetails.module.css";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";

function ExerciseDetails(props) {
  return (
    <li className={classes.detailSection}>
      <div className={classes.detailBubble}>
        <Row className={classes.detailButtonsSection}>
          <Col xs={12} sm={3}>
            {props.exerciseName ? (
              <Link href={"/tracking/exerciseHistory/" + props.exerciseName}>
                {props.exerciseName}
              </Link>
            ) : (
              <label>{props.dateOfExercise}</label>
            )}{" "}
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
                props.removeExerciseRecord(props.id);
              }}
            >
              {props.removeButtonText}
            </button>
          </Col>
        </Row>
      </div>
    </li>
  );
}

export default ExerciseDetails;
