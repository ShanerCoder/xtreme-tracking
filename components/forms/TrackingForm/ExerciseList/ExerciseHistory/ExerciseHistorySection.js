import React from "react";
import { Col, Row } from "react-bootstrap";
import Card from "../../../../ui/Card";
import LighterDiv from "../../../../ui/LighterDiv";
import ExerciseDetails from "../../ExerciseDetails";
import classes from "./ExerciseHistorySection.module.css";

function ExerciseHistorySection(props) {
  return (
    <>
      <h1 className={classes.headerFormatting}>
        List of Records for Exercise: {props.exerciseName}
      </h1>
      <ul className="list">
        {props.exerciseHistory.map((exercise) => (
          <React.Fragment key={exercise.id}>
            <Row>
              <Col xs={12} className={classes.columnPadding}>
                <ExerciseDetails
                  removeExerciseRecord={props.removeExerciseRecord}
                  id={exercise.id}
                  weightUsed={exercise.weightUsed}
                  numberOfReps={exercise.numberOfReps}
                  numberOfSets={exercise.numberOfSets}
                  dateOfExercise={exercise.dateOfExercise}
                  removeButtonText={"Remove Exercise Record"}
                />
              </Col>
              <hr></hr>
            </Row>
          </React.Fragment>
        ))}
      </ul>
    </>
  );
}

export default ExerciseHistorySection;
