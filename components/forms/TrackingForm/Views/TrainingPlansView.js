import { Col, Row } from "react-bootstrap";
import Card from "../../../ui/Card";
import SelectExerciseForm from "../../../form-components/Common/SelectExerciseForm";
import GoalsAtDateSection from "../Goals/GoalsAtDateSection";
import React from "react";

function TrainingPlansView(props) {
  return (
    <>
      {props.trainingPlans && props.trainingPlans.length ? (
        <ul className="list">
          {props.trainingPlans.map((plan) => (
            <h1>Yep</h1>
          ))}
        </ul>
      ) : (
        <h2 className="center">No Training Plans created</h2>
      )}
      <div className="center">
        <button
          onClick={() => {
            props.handleLoader("/tracking/newTrainingPlan");
          }}
        >
          Create New Training Plan
        </button>
      </div>
    </>
  );
}

export default TrainingPlansView;
