import { Col, Row } from "react-bootstrap";
import ExercisesAtDateSection from "../ExerciseHistoryAtDate/ExercisesAtDateSection";
import NewExerciseSection from "../ExerciseHistoryAtDate/NewExerciseSection";

function ExerciseHistoryView(props) {
  return ( <Row>
    <Col style={{ paddingBottom: "25px" }} xs={12} lg={4}>
      <NewExerciseSection
        exerciseList={props.exerciseList}
        selectedDate={props.selectedDate}
        addExercise={props.handleAddExercise}
      />
    </Col>
    <Col xs={12} lg={8}>
      {props.exerciseHistory && props.exerciseHistory.length ? (
        <ExercisesAtDateSection
          removeExerciseRecord={props.handleRemoveExerciseRecord}
          exercises={props.exerciseHistory}
          selectedDate={props.selectedDate}
        />
      ) : (
        <h3 className="center" style={{ padding: "15px" }}>
          No Exercises Have been added
        </h3>
      )}
    </Col>
  </Row> );
}

export default ExerciseHistoryView;