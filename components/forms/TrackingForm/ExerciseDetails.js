import classes from "./ExerciseDetails.module.css";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";

function ExerciseDetails(props) {
  let columnSpacing = 2;
  if (!props.removeExerciseRecord) columnSpacing = 3;
  return (
    <li className={classes.detailSection}>
      <div className={classes.detailBubble}>
        <Row className={classes.detailButtonsSection}>
          <Col xs={12} sm={3}>
            {props.exerciseName && props.username && (
              <Link
                href={
                  "/tracking/exerciseHistory/" +
                  props.exerciseName +
                  "?username=" +
                  props.username
                }
              >
                {props.exerciseName}
              </Link>
            )}
            {props.exerciseName && !props.username && (
              <Link href={"/tracking/exerciseHistory/" + props.exerciseName}>
                {props.exerciseName}
              </Link>
            )}
            {!props.exerciseName && <label>{props.dateOfExercise}</label>}
          </Col>

          <Col xs={12} sm={columnSpacing}>
            <label>{props.weightUsed}kg</label>
          </Col>
          <Col xs={12} sm={columnSpacing}>
            <label>{props.numberOfReps} reps</label>
          </Col>
          <Col xs={12} sm={columnSpacing}>
            <label>{props.numberOfSets} sets</label>
          </Col>
          {props.removeExerciseRecord && (
            <Col className={classes.columnPadding} xs={12} sm={3}>
              <button
                onClick={() => {
                  props.removeExerciseRecord(props.id);
                }}
              >
                {props.removeButtonText}
              </button>
            </Col>
          )}
        </Row>
      </div>
    </li>
  );
}

export default ExerciseDetails;
