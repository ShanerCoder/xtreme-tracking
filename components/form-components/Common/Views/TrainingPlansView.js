import React from "react";
import { Col, Row } from "react-bootstrap";
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
        <Row>
          <Col xs={12} lg={6} style={{ marginBottom: "15px" }}>
            <button
              className="lowerWidth"
              onClick={() => {
                props.handleLoader("/tracking/trainingPlan/newTrainingPlan");
              }}
            >
              Create New Training Plan
            </button>
          </Col>
          <Col xs={12} lg={6}>
            <button
              className="lowerWidth"
              onClick={() => {
                props.handleLoader(
                  "/tracking/trainingPlan/exampleTrainingPlans"
                );
              }}
            >
              View Example Training Plans
            </button>
          </Col>
        </Row>
      )}
    </>
  );
}

export default TrainingPlansView;
