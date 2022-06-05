import classes from "./SingleExerciseDetails.module.css";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import { useLoadingStore } from "../../../../context/loadingScreen";

function SingleExerciseDetails(props) {
  const router = useRouter();
  const [loadingScreen, showLoadingScreen] = useLoadingStore();

  async function handleLoader(URL) {
    showLoadingScreen({ type: true });
    await router.push(URL);
    showLoadingScreen({ type: false });
  }

  return (
    <li key={props.exerciseName} className={classes.detailSection}>
      <div className={classes.detailBubble}>
        <Row className={classes.detailButtonsSection}>
          <Col xs={props.columnSpacing} sm={props.columnSpacing}>
            <label
              className="linkLabel"
              onClick={() => {
                handleLoader("/tracking/exerciseHistory/" + props.exerciseName);
              }}
            >
              {props.exerciseName}
            </label>
          </Col>
          <Col xs={props.columnSpacing} sm={props.columnSpacing}>
            <label>{props.muscleGroup}</label>
          </Col>
        </Row>
        {props.removeExercise && (
          <Row xs={12}>
            <button
              className={classes.buttonFormatting}
              onClick={() => {
                props.removeExercise(props.exerciseName);
              }}
            >
              Remove Exercise
            </button>
          </Row>
        )}
      </div>
    </li>
  );
}

export default SingleExerciseDetails;
