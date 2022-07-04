import classes from "./FoodDetails.module.css";
import { Col, Row } from "react-bootstrap";

function FoodDetails(props) {
  let columnSpacing = 3;
  if (!props.removeFoodRecord) columnSpacing = 4;

  return (
    <li>
      <div className={classes.detailBubble}>
        <Row className={classes.detailButtonsSection}>
          <Col xs={12} sm={columnSpacing}>
            <label>{props.foodName}</label>
          </Col>
          <Col xs={12} sm={columnSpacing}>
            <label>{props.gramsEaten}g Eaten</label>
          </Col>
          <Col xs={12} sm={columnSpacing}>
            <label>{props.totalCalories} Calories</label>
          </Col>
          {props.removeFoodRecord && (
            <Col className={classes.columnPadding} xs={12} sm={3}>
              <button
                onClick={() => {
                  props.removeFoodRecord(props.id);
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

export default FoodDetails;
