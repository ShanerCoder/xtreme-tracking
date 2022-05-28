import classes from "./NewCustomExerciseSection.module.css";
import Card from "../../../ui/Card";
import { Col, Row } from "react-bootstrap";
import { useRef } from "react";

function NewCustomExerciseSection(props) {
  const exerciseNameRef = useRef();
  const muscleGroupDropdownRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const postData = {
      exerciseName: exerciseNameRef.current.value,
      muscleGroup: muscleGroupDropdownRef.current.value,
    };

    props.addExercise(postData);
  }

  function handleFilterChange(event) {
    setMuscleGroupFilter(event.target.value);
  }

  return (
    <>
      <Card>
        <h2 className="center" style={{ padding: "15px" }}>
          Create a new Custom Exercise:
        </h2>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col className={classes.control} xs={12} lg={6}>
              <label htmlFor={"exerciseNameInput"}>Name of Exercise</label>
              <input
                type="text"
                required
                id="exerciseNameInput"
                placeholder="Name"
                maxLength="40"
                ref={exerciseNameRef}
              />
            </Col>
            <Col className={classes.control} xs={12} lg={6}>
              <label htmlFor={"muscleGroup"}>Muscle Group</label>
              <select
                type={"datalist"}
                required
                id={"muscleGroup"}
                ref={muscleGroupDropdownRef}
              >
                {props.muscleGroups.map((muscleGroup) => (
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
      </Card>
    </>
  );
}

export default NewCustomExerciseSection;
