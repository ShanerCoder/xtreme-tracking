import classes from "./NewTrainingPlanSection.module.css";
import { useRef, useState } from "react";
import Card from "../../../ui/Card";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import LighterDiv from "../../../ui/LighterDiv";
import DarkerDiv from "../../../ui/DarkerDiv";

function NewTrainingPlanSection(props) {
  const exerciseDropdownRef = useRef();
  const [muscleGroupFilter, setMuscleGroupFilter] = useState("All");
  const listOfMuscleGroups = [];

  props.commonExerciseList.map(
    (exercise) =>
      !listOfMuscleGroups.includes(exercise.muscleGroup) &&
      listOfMuscleGroups.push(exercise.muscleGroup)
  );

  function handleSubmit(event) {
    event.preventDefault();

    const postData = {
      exerciseName: exerciseDropdownRef.current.value,
      weightUsed: weightUsedRef.current.value,
      numberOfReps: numberOfRepsRef.current.value,
      numberOfSets: numberOfSetsRef.current.value,
      dateOfExercise: new Date(props.selectedDate),
    };
    props.addExercise(postData);
  }

  function handleFilterChange(event) {
    setMuscleGroupFilter(event.target.value);
  }

  return (
    <>
      <LighterDiv>
        <h3 className="center" style={{ paddingBottom: "15px" }}>
          Create a new Training Plan:
        </h3>
        <Row>
          <Col xs={12} lg={8}>
            <Card>
              <form onSubmit={handleSubmit}>
                <Row className="lowerWidth" style={{ paddingTop: "15px" }}>
                  <Col className="control" xs={12}>
                    <label htmlFor={"exerciseInput"}>Name of Exercise</label>
                    <select
                      type={"datalist"}
                      required
                      id={"exerciseInput"}
                      ref={exerciseDropdownRef}
                    >
                      {props.exerciseList.map(
                        (exercise) =>
                          (exercise.muscleGroup == muscleGroupFilter ||
                            muscleGroupFilter == "All") && (
                            <option
                              key={exercise.exerciseName}
                              value={exercise.exerciseName}
                            >
                              {exercise.exerciseName}
                            </option>
                          )
                      )}
                      {props.commonExerciseList.map(
                        (exercise) =>
                          (exercise.muscleGroup == muscleGroupFilter ||
                            muscleGroupFilter == "All") && (
                            <option
                              key={exercise.exerciseName}
                              value={exercise.exerciseName}
                            >
                              {exercise.exerciseName}
                            </option>
                          )
                      )}
                    </select>
                  </Col>
                </Row>
                <Row className="lowerWidth">
                  <Col className="control" xs={12}>
                    <label htmlFor={"exerciseFilter"}>
                      Filter Exercises by Muscle Group
                    </label>
                    <select
                      type={"datalist"}
                      required
                      id={"exerciseFilter"}
                      onChange={handleFilterChange}
                    >
                      <option value="All">All</option>
                      {listOfMuscleGroups.map((muscleGroup) => (
                        <option key={muscleGroup} value={muscleGroup}>
                          {muscleGroup}
                        </option>
                      ))}
                    </select>
                  </Col>
                </Row>
                <div className="lowerWidth">
                  <button className={"lowerWidth " + classes.buttonPadding}>
                    Add Exercise to Plan
                  </button>
                </div>
              </form>
              <form>
                <div className={"control center"}>
                  <label>Exercise not listed?</label>
                </div>
                <div className={"lowerWidth " + classes.linkStyling}>
                  <label
                    className="linkLabel"
                    onClick={() => {
                      handleLoader("/tracking/exerciseList");
                    }}
                  >
                    Create New Exercise
                  </label>
                </div>
              </form>
            </Card>
          </Col>

          <Col xs={12} lg={4}>
            <Card>
              <h2 style={{ padding: "15px" }} className="center">
                Currently Added Exercises:
              </h2>
            </Card>
          </Col>
        </Row>
      </LighterDiv>
      <DarkerDiv>
        <div>
          <button className="lowerWidth">Create Training Plan</button>
        </div>
      </DarkerDiv>
    </>
  );
}

export default NewTrainingPlanSection;
