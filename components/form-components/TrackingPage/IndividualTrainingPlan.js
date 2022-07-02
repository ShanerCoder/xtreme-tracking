import { Col, Row } from "react-bootstrap";
import Card from "../../ui/Card";
import classes from "./IndividualTrainingPlan.module.css";
import { useRouter } from "next/router";
import { useLoadingStore } from "../../../context/loadingScreen";

function IndividualTrainingPlan(props) {
  const router = useRouter();
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  const spacing = props.handleRemoveTrainingPlan ? 4 : 6;

  async function handleLoader(URL) {
    showLoadingScreen({ type: true });
    await router.push(URL);
    showLoadingScreen({ type: false });
  }

  return (
    <li style={{ paddingBottom: "15px" }}>
      <Card>
        <Row className={classes.trainingPlanRowFormatting}>
          <Col xs={12} lg={spacing}>
            <label
              className={"linkLabel " + classes.labelFormatting}
              onClick={() => {
                const usernameParam = props.username
                  ? "?username=" + props.username
                  : "";
                handleLoader(
                  "/tracking/trainingPlan/" +
                    props.trainingPlanName +
                    usernameParam
                );
              }}
            >
              {props.trainingPlanName}
            </label>
          </Col>
          <Col xs={12} lg={spacing}>
            <label className={classes.labelFormatting}>
              Number of Exercises: {props.numberOfExercises}
            </label>
          </Col>
          {props.handleRemoveTrainingPlan && (
            <Col xs={12} lg={4} className={classes.columnPadding}>
              <button
                className={classes.buttonFormatting}
                onClick={() => {
                  props.handleRemoveTrainingPlan(props.id);
                }}
              >
                Delete Training Plan
              </button>
            </Col>
          )}
        </Row>
      </Card>
    </li>
  );
}

export default IndividualTrainingPlan;
