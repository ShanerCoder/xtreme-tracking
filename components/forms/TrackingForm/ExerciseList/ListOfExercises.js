import classes from "./ListOfExercises.module.css";
import { Col, Row } from "react-bootstrap";
import React from "react";
import SingleExerciseDetails from "./SingleExerciseDetails";

function ListOfExercises(props) {

  return (
    <ul className="list">
      <li key={"header"} className={classes.detailSection}>
        <div className={classes.detailBubble}>
          <Row className={classes.detailButtonsSection}>
            <Col xs={6} sm={6}>
              <label>Exercise Name</label>
            </Col>
            <Col xs={6} sm={6}>
              <label>Muscle Group</label>
            </Col>
          </Row>
        </div>
      </li>
      {props.exercises.map((exercise) => (
        <React.Fragment key={exercise.id}>
          {(props.muscleGroupFilter == exercise.muscleGroup ||
            props.muscleGroupFilter == "All") && (
            <SingleExerciseDetails
              key={exercise.exerciseName}
              removeExercise={props.removeExercise}
              exerciseName={exercise.exerciseName}
              muscleGroup={exercise.muscleGroup}
            />
          )}
        </React.Fragment>
      ))}
    </ul>
  );
}

export default ListOfExercises;
