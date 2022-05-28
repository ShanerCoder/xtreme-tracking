import { Col, Row } from "react-bootstrap";
import React from "react";
import Card from "../../../ui/Card";
import ListOfExercises from "./ListOfExercises";
import classes from "./FullListOfExercises.module.css";
import { useState } from "react";

function FullListOfExercises(props) {
  const [muscleGroupFilter, setMuscleGroupFilter] = useState("All");

  function handleFilterChange(event) {
    setMuscleGroupFilter(event.target.value);
  }

  return (
    <>
      <Row className={classes.muscleGroupFilterPadding}>
        <Card>
          <h3 className={classes.headerPadding}>Set Muscle Group Filter</h3>
          <div className={classes.control}>
            <select
              type={"datalist"}
              required
              id={"exerciseFilter"}
              onChange={handleFilterChange}
            >
              <option value="All">All</option>
              {props.listOfMuscleGroups.map((muscleGroup) => (
                <option key={muscleGroup} value={muscleGroup}>
                  {muscleGroup}
                </option>
              ))}
            </select>
          </div>
        </Card>
      </Row>
      <Row>
        <Col xs={12} lg={6}>
          <Row className={classes.rowSpacing}>
            <Card>
              <h3 className={classes.headerPadding}>Common Exercises</h3>
            </Card>
          </Row>
          <Row className={classes.rowSpacing}>
            <ListOfExercises
              exercises={props.commonExerciseList}
              muscleGroupFilter={muscleGroupFilter}
            />
          </Row>
        </Col>
        <Col xs={12} lg={6} className={classes.columnPadding}>
          <Row className={classes.rowSpacing}>
            <Card>
              <h3 className={classes.headerPadding}>Custom Exercises</h3>
            </Card>
          </Row>
          <Row className={classes.rowSpacing}>
            <ListOfExercises
              exercises={props.exerciseList}
              removeExercise={props.removeExercise}
              muscleGroupFilter={muscleGroupFilter}
            />
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default FullListOfExercises;
