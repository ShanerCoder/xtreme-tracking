import classes from "./NewExerciseSection.module.css";
import { useRef, useState } from "react";
import Card from "../../ui/Card";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import { useLoadingStore } from "../../../context/loadingScreen";

function NewExerciseSection(props) {
  const router = useRouter();
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  const exerciseDropdownRef = useRef();
  const weightUsedRef = useRef();
  const numberOfRepsRef = useRef();
  const numberOfSetsRef = useRef();
  const exerciseList = props.exerciseList;
  const commonExerciseList = props.commonExerciseList;
  const [muscleGroupFilter, setMuscleGroupFilter] = useState("All");
  const listOfMuscleGroups = [];

  commonExerciseList.map(
    (exercise) =>
      !listOfMuscleGroups.includes(exercise.muscleGroup) &&
      listOfMuscleGroups.push(exercise.muscleGroup)
  );

  async function handleLoader(URL) {
    showLoadingScreen({ type: true });
    await router.push(URL);
    showLoadingScreen({ type: false });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const selectedDate = new Date(props.selectedDate);
    selectedDate.setHours(1, 0, 0, 0);
    const postData = {
      exerciseName: exerciseDropdownRef.current.value,
      weightUsed: weightUsedRef.current.value,
      numberOfReps: numberOfRepsRef.current.value,
      numberOfSets: numberOfSetsRef.current.value,
      dateOfExercise: selectedDate,
    };
    props.addExercise(postData);
  }

  function handleFilterChange(event) {
    setMuscleGroupFilter(event.target.value);
  }

  return (
    <>
      <Card>
        <h3 className="center" style={{ padding: "15px" }}>
          Add in a new Exercise for date:
        </h3>
        <h3 className="center" style={{ paddingBottom: "15px" }}>
          {props.selectedDate}
        </h3>
        <form onSubmit={handleSubmit}>
          <Row className="lowerWidth">
            <Col className="control" xs={12}>
              <label htmlFor={"exerciseInput"}>Name of Exercise</label>
              <select
                type={"datalist"}
                required
                id={"exerciseInput"}
                ref={exerciseDropdownRef}
              >
                {exerciseList.map(
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
                {commonExerciseList.map(
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
          <Row className="lowerWidth">
            <Col className="control" xs={12}>
              <label htmlFor={"weightUsed"}>Weight Used (kg)</label>
              <input
                type={"number"}
                step="0.01"
                max={1000}
                ref={weightUsedRef}
                id={"weightUsed"}
                required
              />
            </Col>
          </Row>
          <Row className="lowerWidth">
            <Col className="control" xs={6}>
              <label htmlFor={"noOfReps"}>Number of Reps</label>
              <input
                type={"number"}
                step="1"
                max={1000}
                ref={numberOfRepsRef}
                id={"noOfReps"}
                required
              />
            </Col>
            <Col className="control" xs={6}>
              <label htmlFor={"noOfSets"}>Number of Sets</label>
              <input
                type={"number"}
                step="1"
                max={1000}
                ref={numberOfSetsRef}
                id={"noOfSets"}
                required
              />
            </Col>
          </Row>
          <div className="lowerWidth">
            <button className={"lowerWidth " + classes.buttonPadding}>
              Add Exercise
            </button>
          </div>
        </form>
        <form>
          <div className={"control " + classes.notListedLabel}>
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
    </>
  );
}

export default NewExerciseSection;
