import classes from "./NewExerciseSection.module.css";
import { useRef, useState } from "react";
import Card from "../../ui/Card";
import { Col, Row } from "react-bootstrap";

function NewExerciseSection(props) {
  const ExerciseDropdownRef = useRef();
  const exerciseList = props.exerciseList;
  const commonExerciseList = props.commonExerciseList;
  const [muscleGroupFilter, setMuscleGroupFilter] = useState("All");

  const listOfMuscleGroups = [];

  commonExerciseList.map(
    (exercise) =>
      !listOfMuscleGroups.includes(exercise.muscleGroup) &&
      listOfMuscleGroups.push(exercise.muscleGroup)
  );

  function handleSubmit(event) {
    event.preventDefault();
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
          <Row>
            <Col className={classes.control} xs={12}>
              <label htmlFor={"exerciseInput"}>Name of Exercise</label>
              <select
                type={"datalist"}
                required
                id={"exerciseInput"}
                ref={ExerciseDropdownRef}
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
          <Row>
            <Col className={classes.control} xs={12}>
              <label htmlFor={"exerciseInput"}>Filter Exercises</label>
              <select
                type={"datalist"}
                required
                id={"exerciseInput"}
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
          <div className={classes.actions}>
            <button>Add Exercise</button>
          </div>
        </form>
        <form>
          <div className={classes.control}>
            <label>Exercise not listed?</label>
          </div>
          <div className={classes.actions}>
            <button>Create New Exercise</button>
          </div>
        </form>
      </Card>
    </>
  );
}

export default NewExerciseSection;
