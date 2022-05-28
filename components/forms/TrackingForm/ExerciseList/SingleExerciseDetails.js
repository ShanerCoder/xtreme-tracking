import classes from "./SingleExerciseDetails.module.css";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";

function SingleExerciseDetails(props) {
  const router = useRouter();
  return (
    <li key={props.exerciseName} className={classes.detailSection}>
      <div className={classes.detailBubble}>
        <Row className={classes.detailButtonsSection}>
          <Col xs={props.columnSpacing} sm={props.columnSpacing}>
            <Link href={"/tracking/exerciseHistory/" + props.exerciseName}>
              {props.exerciseName}
            </Link>
          </Col>
          <Col xs={props.columnSpacing} sm={props.columnSpacing}>
            <label>{props.muscleGroup}</label>
          </Col>
        </Row>
        {props.removeExercise && (
          <Row xs={12}>
            <button
              className={classes.buttonFormatting}
              onClick={() => {
                props.removeExercise(props.exerciseName);
              }}
            >
              Remove Exercise
            </button>
          </Row>
        )}
      </div>
    </li>
  );
}

export default SingleExerciseDetails;
