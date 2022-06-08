import { Col, Row } from "react-bootstrap";
import classes from "./NewTrainingPlanSection.module.css";

function AddedExercisesSection(props) {
  return props.addedExercises.map((exerciseName) => (
    <Row key={exerciseName}>
      <Col xs={12} sm={7}>
        <h3 className={classes.addedExercisesFormatting}>
          {exerciseName}
        </h3>
      </Col>
      <Col xs={12} sm={5} className="control center">
        <button onClick={() => {
          props.removeExerciseFromPlan(exerciseName);
        }}>Remove Exercise</button>
      </Col>
    </Row>
  ));
}

export default AddedExercisesSection;
