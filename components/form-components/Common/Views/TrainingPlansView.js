import React from "react";
import IndividualTrainingPlan from "../../../form-components/TrackingPage/IndividualTrainingPlan";

function TrainingPlansView(props) {
  return (
    <>
      {props.trainingPlans && props.trainingPlans.length ? (
        <ul className="list">
          {props.trainingPlans.map((plan) => (
            <IndividualTrainingPlan
              key={plan.id}
              id={plan.id}
              username={plan.username}
              trainingPlanName={plan.trainingPlanName}
              numberOfExercises={plan.numberOfExercises}
              handleRemoveTrainingPlan={props.handleRemoveTrainingPlan}
            />
          ))}
        </ul>
      ) : (
        <h2 className="center">No Training Plans created</h2>
      )}
      {props.handleRemoveTrainingPlan && (
        <div>
          <button
            className="lowerWidth"
            onClick={() => {
              props.handleLoader("/tracking/trainingPlan/newTrainingPlan");
            }}
          >
            Create New Training Plan
          </button>
        </div>
      )}
    </>
  );
}

export default TrainingPlansView;
