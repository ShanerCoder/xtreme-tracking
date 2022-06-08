import { Col, Row } from "react-bootstrap";
import Card from "../../../ui/Card";
import SelectExerciseForm from "../../../form-components/Common/SelectExerciseForm";
import GoalsAtDateSection from "../Goals/GoalsAtDateSection";
import React from "react";
import IndividualTrainingPlan from "../../../form-components/TrackingPage/IndividualTrainingPlan";

function TrainingPlansView(props) {
  return (
    <>
      {props.trainingPlans && props.trainingPlans.length ? (
        <ul className="list">
          {props.trainingPlans.map((plan) => (
            <IndividualTrainingPlan
              key={plan.trainingPlanName}
              username={plan.username}
              trainingPlanName={plan.trainingPlanName}
              numberOfExercises={plan.numberOfExercises}
            />
          ))}
        </ul>
      ) : (
        <h2 className="center">No Training Plans created</h2>
      )}
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
    </>
  );
}

export default TrainingPlansView;
