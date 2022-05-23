import classes from "./ExercisesAtDateSection.module.css";
import ExerciseDetails from "./ExerciseDetails";

function ExercisesAtDateSection(props) {
  let noExercises = (
    <h3 className="center">No Exercises Recorded on this Date</h3>
  );
  return (
    <>
      <ul className={classes.list}>
        {props.exercises.map((exercise) => (
          <div key={exercise.id}>
            {new Date(exercise.dateOfExercise).toDateString() ==
              props.selectedDate && (
              <>
                {(noExercises = null)}
                <ExerciseDetails
                  key={exercise.id}
                  removeExercise={props.removeExercise}
                  id={exercise.id}
                  exerciseName={exercise.exerciseName}
                  weightUsed={exercise.weightUsed}
                  numberOfReps={exercise.numberOfReps}
                  numberOfSets={exercise.numberOfSets}
                />
              </>
            )}
          </div>
        ))}
      </ul>
      {noExercises || (
        <h3 className="center">No More Exercises for this Day</h3>
      )}
    </>
  );
}

export default ExercisesAtDateSection;
