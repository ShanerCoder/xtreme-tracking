import { Col, Row } from "react-bootstrap";
import Card from "../../../ui/Card";
import SelectExerciseForm from "../../../form-components/Common/SelectExerciseForm";
import GoalsAtDateSection from "../Goals/GoalsAtDateSection";

function GoalsView(props) {
  return (
    <Row>
      <Col xs={12} lg={4}>
        <Card>
          <h2 className="center" style={{ padding: "15px" }}>
            Add a Goal
          </h2>
          <SelectExerciseForm
            exerciseList={props.exerciseList}
            handleSubmit={props.handleAddGoal}
            setErrorMessage={props.handleSetErrorMessage}
            submitButtonText={"Add Goal"}
          />
        </Card>
      </Col>
      <Col xs={12} lg={8}>
        {props.goalsList && props.goalsList.length ? (
          <GoalsAtDateSection
            removeGoalRecord={props.handleRemoveGoal}
            goals={props.goalsList}
            selectedDate={props.selectedDate}
          />
        ) : (
          <h3 className="center" style={{ padding: "15px" }}>
            No Goals Have been added
          </h3>
        )}
      </Col>
    </Row>
  );
}

export default GoalsView;
