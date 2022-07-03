import { Col, Row } from "react-bootstrap";
import AddNewFoodSection from "../CalorieHistoryAtDate/AddNewFoodSection";

function CalorieHistoryView(props) {
  return (
    <Row>
      <Col style={{ paddingBottom: "25px" }} xs={12} lg={4}>
        <AddNewFoodSection selectedDate={props.selectedDate} foodList={[]} />
      </Col>
      {/* <Col xs={12} lg={8}>
        {props.exerciseHistory && props.exerciseHistory.length ? (
          <ExercisesAtDateSection
            removeExerciseRecord={props.handleRemoveExerciseRecord}
            exercises={props.exerciseHistory}
            selectedDate={props.selectedDate}
          />
        ) : (
          <h3 className="center" style={{ padding: "15px" }}>
            No Foods Have been added for this date
          </h3>
        )}
      </Col> */}
    </Row>
  );
}

export default CalorieHistoryView;
