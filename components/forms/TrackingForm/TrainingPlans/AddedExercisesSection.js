import { Col, Row } from "react-bootstrap";
import classes from "./TrainingPlanSection.module.css";

function AddedExercisesSection(props) {
  return props.addedExercises.map((exerciseName) => (
    <Row key={exerciseName}>
      <Col
        xs={12}
        sm={props.removeExerciseFromPlan ? 7 : 12}
        className="center"
      >
        <label
          className={
            "linkLabel " +
            (props.removeExerciseFromPlan
              ? classes.addedExercisesFormatting
              : classes.nonOwnerExerciseFormatting)
          }
          onClick={() => {
            props.handleLoader(exerciseName);
          }}
        >
          {exerciseName}
        </label>
      </Col>
      {props.removeExerciseFromPlan && (
        <Col xs={12} sm={5} className="control center">
          <button
            onClick={() => {
              props.removeExerciseFromPlan(exerciseName);
            }}
          >
            Remove Exercise
          </button>
        </Col>
      )}
    </Row>
  ));
}

export default AddedExercisesSection;
