import { Col, Row } from "react-bootstrap";
import { useRef, useState } from "react";
import classes from "./SelectExerciseForm.module.css";

function SelectExerciseForm(props) {
  const exerciseDropdownRef = useRef();
  const weightUsedRef = useRef();
  const numberOfRepsRef = useRef();
  const numberOfSetsRef = useRef();
  const dateToAchieveRef = useRef();
  const [muscleGroupFilter, setMuscleGroupFilter] = useState("All");
  const listOfMuscleGroups = [];

  props.exerciseList.map(
    (exercise) =>
      !listOfMuscleGroups.includes(exercise.muscleGroup) &&
      listOfMuscleGroups.push(exercise.muscleGroup)
  );

  function handleFilterChange(event) {
    setMuscleGroupFilter(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const dateToAchieve = new Date(dateToAchieveRef.current.value);
    const currentDate = new Date();

    if (dateToAchieve < currentDate) {
      props.setErrorMessage("Please select a date greater than today!");
      return null;
    }

    const postData = {
      exerciseName: exerciseDropdownRef.current.value,
      weightUsed: weightUsedRef.current.value,
      numberOfReps: numberOfRepsRef.current.value,
      numberOfSets: numberOfSetsRef.current.value,
      dateToAchieveBy: dateToAchieveRef.current.value,
    };
    props.handleSubmit(postData);
  }

  return (
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
          </select>
        </Col>
      </Row>
      <Row className="lowerWidth">
        <Col className="control" xs={12}>
          <label htmlFor={"exerciseFilter"}>Filter Exercises</label>
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
      <Row>
        <Col className="control" xs={12}>
          <button
            type="button"
            className={classes.buttonPadding}
            style={{ width: "80%", marginLeft: "10%" }}
            onClick={() => {
              let randomExerciseFound = false;
              while (!randomExerciseFound) {
                const randomExercise =
                  props.exerciseList[
                    Math.floor(Math.random() * props.exerciseList.length)
                  ];
                if (
                  randomExercise.muscleGroup == muscleGroupFilter ||
                  muscleGroupFilter == "All"
                ) {
                  exerciseDropdownRef.current.value =
                    randomExercise.exerciseName;
                  randomExerciseFound = true;
                }
              }
            }}
          >
            Random Exercise
          </button>
        </Col>
      </Row>
      <Row className="lowerWidth">
        <Col className="control" xs={12}>
          <label htmlFor={"weightUsed"}>Weight to Achieve (kg)</label>
          <input
            type={"number"}
            step="0.01"
            max={1000}
            min={1}
            ref={weightUsedRef}
            id={"weightUsed"}
            required
          />
        </Col>
      </Row>
      <Row className="lowerWidth">
        <Col className="control" xs={6}>
          <label htmlFor={"noOfReps"}>Number of Reps to Achieve</label>
          <input
            type={"number"}
            step="1"
            max={1000}
            min={1}
            ref={numberOfRepsRef}
            id={"noOfReps"}
            required
          />
        </Col>
        <Col className="control" xs={6}>
          <label htmlFor={"noOfSets"}>Number of Sets to Achieve</label>
          <input
            type={"number"}
            step="1"
            max={1000}
            min={1}
            ref={numberOfSetsRef}
            id={"noOfSets"}
            required
          />
        </Col>
      </Row>
      <Row className="lowerWidth">
        <Col className="control" xs={12}>
          <label htmlFor={"dateToAchieve"}>Date to Achieve by</label>
          <input
            type={"date"}
            ref={dateToAchieveRef}
            min={new Date().toDateString()}
            id={"dateToAchieve"}
            required
          />
        </Col>
      </Row>
      <div className="lowerWidth">
        <button className={classes.buttonPadding + " lowerWidth"}>
          {props.submitButtonText}
        </button>
      </div>
    </form>
  );
}

export default SelectExerciseForm;
