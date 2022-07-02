import classes from "./TrainingPlanSection.module.css";
import { useEffect, useReducer, useRef, useState } from "react";
import Card from "../../../ui/Card";
import { Col, Row } from "react-bootstrap";
import LighterDiv from "../../../ui/LighterDiv";
import DarkerDiv from "../../../ui/DarkerDiv";
import AddedExercisesSection from "./AddedExercisesSection";
import trainingPlan from "../../../../models/trainingPlan";

function TrainingPlanSection(props) {
  const exerciseDropdownRef = useRef();
  const trainingPlanName = useRef();
  const [muscleGroupFilter, setMuscleGroupFilter] = useState("All");
  const [addedExercises, setAddedExercises] = useState(
    props.trainingPlan ? props.trainingPlan.listOfExercises : []
  );
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const listOfMuscleGroups = [];
  const ownerViewing = props.view != "OtherUserView";
  const newTrainingPlan = props.view == "AddPlan";

  function handlePreventBackslash(event) {
    if (event.key === "\\" || event.key === "/") {
      event.preventDefault();
    }
  }

  {
    ownerViewing &&
      props.commonExerciseList.map(
        (exercise) =>
          !listOfMuscleGroups.includes(exercise.muscleGroup) &&
          listOfMuscleGroups.push(exercise.muscleGroup)
      );
  }

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
    if (props.addTrainingPlanToOwnList)
      props.addTrainingPlanToOwnList(postData);
    else props.addTrainingPlan(postData);
  }

  function handleFilterChange(event) {
    setMuscleGroupFilter(event.target.value);
  }

  return (
    <>
      <LighterDiv>
        <h3 className="center" style={{ paddingBottom: "15px" }}>
          {newTrainingPlan
            ? "Create a new Training Plan"
            : "Viewing Training Plan: " + props.trainingPlan.trainingPlanName}
        </h3>
        <Row>
          {ownerViewing && (
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
          )}

          <Col xs={12} lg={ownerViewing ? 4 : 12}>
            <Card>
              <h2 className={classes.addedExercisesFormatting}>
                {ownerViewing
                  ? "Currently Added Exercises:"
                  : "Exercises in Training Plan:"}
              </h2>
              {addedExercises.length ? (
                ownerViewing ? (
                  <AddedExercisesSection
                    addedExercises={addedExercises}
                    removeExerciseFromPlan={removeExerciseFromPlan}
                    handleLoader={props.handleLoader}
                  />
                ) : (
                  <AddedExercisesSection
                    addedExercises={addedExercises}
                    handleLoader={props.handleLoader}
                  />
                )
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
                onKeyDown={handlePreventBackslash}
                disabled={newTrainingPlan ? false : true}
                defaultValue={
                  newTrainingPlan ? null : props.trainingPlan.trainingPlanName
                }
              />
            </Col>
          </Row>{" "}
          {ownerViewing && (
            <Row>
              <Col xs={12} className={"control"}>
                <button className="lowerWidth bigButtonText">
                  {(ownerViewing &&
                    newTrainingPlan &&
                    "Create Training Plan") ||
                    (ownerViewing && "Update Training Plan")}
                </button>
              </Col>
            </Row>
          )}
          {!ownerViewing && props.addTrainingPlanToOwnList && (
            <Row>
              <Col xs={12} className={"control"}>
                <button className="lowerWidth bigButtonText">
                  Add Training Plan to Own List
                </button>
              </Col>
            </Row>
          )}
        </form>
      </DarkerDiv>
    </>
  );
}

export default TrainingPlanSection;
