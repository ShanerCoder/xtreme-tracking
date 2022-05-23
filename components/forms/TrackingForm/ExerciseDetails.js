import classes from "./ExerciseDetails.module.css";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";

function ExerciseDetails(props) {
  const router = useRouter();
  return (
    <li key={props.id} className={classes.detailSection}>
      <div className={classes.detailBubble}>
        <Row className={classes.detailButtonsSection}>
          <Col xs={12} sm={7}>
            {props.exerciseName}
          </Col>
          <Col className={classes.columnPadding} xs={12} sm={5}>
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
