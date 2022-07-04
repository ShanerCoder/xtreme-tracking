import classes from "./SingleFoodDetails.module.css";
import { Col, Row } from "react-bootstrap";
function SingleFoodDetails(props) {
  return (
    <li key={props.exerciseName} className={classes.detailSection}>
      <div className={classes.detailBubble}>
        <Row className={classes.detailButtonsSection}>
          <Col xs={6} sm={props.columnSpacing}>
            <label>{props.foodName}</label>
          </Col>
          <Col xs={6} sm={props.columnSpacing}>
            <label>{props.caloriesPer100}</label>
          </Col>
          {props.removeFood && (
            <Col xs={12} sm={4}>
              <button
                className={classes.buttonFormatting}
                onClick={() => {
                  props.removeFood(props.foodName);
                }}
              >
                Remove Exercise
              </button>
            </Col>
          )}
        </Row>
      </div>
    </li>
  );
}

export default SingleFoodDetails;
