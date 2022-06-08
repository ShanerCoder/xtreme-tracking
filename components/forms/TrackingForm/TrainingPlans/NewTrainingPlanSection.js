import classes from "./NewTrainingPlanSection.module.css";
import { useReducer, useRef, useState } from "react";
import Card from "../../../ui/Card";
import { Col, Row } from "react-bootstrap";
import LighterDiv from "../../../ui/LighterDiv";
import DarkerDiv from "../../../ui/DarkerDiv";
import AddedExercisesSection from "./AddedExercisesSection";

function NewTrainingPlanSection(props) {
  const exerciseDropdownRef = useRef();
  const trainingPlanName = useRef();
  const [muscleGroupFilter, setMuscleGroupFilter] = useState("All");
  const [addedExercises, setAddedExercises] = useState([]);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const listOfMuscleGroups = [];

  props.commonExerciseList.map(
    (exercise) =>
      !listOfMuscleGroups.includes(exercise.muscleGroup) &&
      listOfMuscleGroups.push(exercise.muscleGroup)
  );

  function addExerciseToPlan(event) {
    event.preventDefault();
    if (
      exerciseDropdownRef.current.value != null &&
      !addedExercises.includes(exerciseDropdownRef.current.value)
    ) {
      const listOfAddedExercises = addedExercises;
      listOfAddedExercises.push(exerciseDropdownRef.current.value);
      setAddedExercises(listOfAddedExercises);
      exerciseDropdownRef.current.value = null;
    }
    forceUpdate();
  }

  function removeExerciseFromPlan(exerciseName) {
    const listOfAddedExercises = addedExercises;
    const index = listOfAddedExercises.indexOf(exerciseName);
    if (index > -1) listOfAddedExercises.splice(index, 1);
    setAddedExercises(listOfAddedExercises);
    forceUpdate();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const postData = {
      trainingPlanName: trainingPlanName.current.value,
      listOfExercises: addedExercises,
    };
    props.addNewTrainingPlan(postData);
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
          <Col xs={12} lg={8} className={classes.columnPadding}>
            <Card>
              <form onSubmit={addExerciseToPlan}>
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
              <h2 className={classes.addedExercisesFormatting}>
                Currently Added Exercises:
              </h2>
              {addedExercises.length ? (
                <AddedExercisesSection
                  addedExercises={addedExercises}
                  removeExerciseFromPlan={removeExerciseFromPlan}
                />
              ) : (
                <h3 className={classes.addedExercisesFormatting}>None</h3>
              )}
            </Card>
          </Col>
        </Row>
      </LighterDiv>
      <DarkerDiv>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col xs={12} className={"control center"}>
              <label htmlFor={"trainingPlanName"}>Name of Training Plan</label>
              <input
                type={"text"}
                maxLength={25}
                ref={trainingPlanName}
                id={"trainingPlanName"}
                style={{ textAlign: "center" }}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} className={"control"}>
              <button className="lowerWidth">Create Training Plan</button>
            </Col>
          </Row>
        </form>
      </DarkerDiv>
    </>
  );
}

export default NewTrainingPlanSection;
