import React from "react";
import ExerciseDetails from "../ExerciseHistoryAtDate/ExerciseDetails";
import classes from "./GoalsAtDateSection.module.css";

function GoalsAtDateSection(props) {
  let noGoals = <h3 className="center">No active goals from this date</h3>;
  return (
    <>
      <ul className="list">
        {props.goals.map((goal) => (
          <React.Fragment key={goal.id}>
            {new Date(goal.dateToAchieveBy) >= new Date(props.selectedDate) && (
              <>
                {(noGoals = null)}
                <h3 className={classes.header}>
                  To Achieve By: {new Date(goal.dateToAchieveBy).toDateString()}
                </h3>
                <ExerciseDetails
                  removeExerciseRecord={props.removeGoalRecord}
                  id={goal.id}
                  exerciseName={goal.exerciseName}
                  weightUsed={goal.weightUsed}
                  numberOfReps={goal.numberOfReps}
                  numberOfSets={goal.numberOfSets}
                  removeButtonText={"Remove Goal"}
                />
              </>
            )}
          </React.Fragment>
        ))}
      </ul>
      {noGoals || (
        <h3 className="center" style={{ paddingTop: "25px" }}>
          No more Goals set
        </h3>
      )}
    </>
  );
}

export default GoalsAtDateSection;
