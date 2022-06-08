import classes from "./ExerciseDetails.module.css";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import { useLoadingStore } from "../../../context/loadingScreen";

function ExerciseDetails(props) {
  const router = useRouter();
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  let columnSpacing = 2;
  if (!props.removeExerciseRecord) columnSpacing = 3;

  async function handleLoader(URL) {
    showLoadingScreen({ type: true });
    await router.push(URL);
    showLoadingScreen({ type: false });
  }

  return (
    <li>
      <div className={classes.detailBubble}>
        <Row className={classes.detailButtonsSection}>
          <Col xs={12} sm={3}>
            {props.exerciseName && props.username && (
              <label
                className="linkLabel"
                onClick={() => {
                  handleLoader(
                    "/tracking/exerciseHistory/" +
                      props.exerciseName +
                      "?username=" +
                      props.username
                  );
                }}
              >
                {props.exerciseName}
              </label>
            )}
            {props.exerciseName && !props.username && (
              <label
                className="linkLabel"
                onClick={() => {
                  handleLoader(
                    "/tracking/exerciseHistory/" + props.exerciseName
                  );
                }}
              >
                {props.exerciseName}
              </label>
            )}
            {!props.exerciseName && <label>{props.dateOfExercise}</label>}
          </Col>

          <Col xs={12} sm={columnSpacing}>
            <label>{props.weightUsed}kg</label>
          </Col>
          <Col xs={12} sm={columnSpacing}>
            <label>{props.numberOfReps} reps</label>
          </Col>
          <Col xs={12} sm={columnSpacing}>
            <label>{props.numberOfSets} sets</label>
          </Col>
          {props.removeExerciseRecord && (
            <Col className={classes.columnPadding} xs={12} sm={3}>
              <button
                onClick={() => {
                  props.removeExerciseRecord(props.id);
                }}
              >
                {props.removeButtonText}
              </button>
            </Col>
          )}
        </Row>
      </div>
    </li>
  );
}

export default ExerciseDetails;
