import ExerciseDetails from "./ExerciseDetails";
import React from "react";

function ExercisesAtDateSection(props) {
  let noExercises = (
    <h3 className="center">No Exercises Recorded on this Date</h3>
  );
  return (
    <>
      <ul className="list">
        {props.exercises.map((exercise) => (
          <React.Fragment key={exercise.id}>
            {new Date(exercise.dateOfExercise).toDateString() ==
              props.selectedDate && (
              <>
                {(noExercises = null)}
                <ExerciseDetails
                  removeExerciseRecord={props.removeExerciseRecord}
                  id={exercise.id}
                  exerciseName={exercise.exerciseName}
                  weightUsed={exercise.weightUsed}
                  numberOfReps={exercise.numberOfReps}
                  numberOfSets={exercise.numberOfSets}
                  removeButtonText={"Remove Exercise Record"}
                  username={props.username}
                />
              </>
            )}
          </React.Fragment>
        ))}
      </ul>
      {noExercises || (
        <h3 className="center" style={{ paddingTop: "25px" }}>
          No more Exercises recorded for this Day
        </h3>
      )}
    </>
  );
}

export default ExercisesAtDateSection;
