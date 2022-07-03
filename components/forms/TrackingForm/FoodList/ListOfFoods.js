import classes from "./ListOfFoods.module.css";
import { Col, Row } from "react-bootstrap";
import React from "react";
import SingleFoodDetails from "./SingleFoodDetails";

function ListOfFoods(props) {
  const columnSpacing = props.removeFood ? 4 : 6;
  return (
    <ul className="list">
      <li key={"header"} className={classes.detailSection}>
        <div className={classes.detailBubble}>
          <Row className={classes.detailButtonsSection}>
            <Col xs={6} sm={columnSpacing}>
              <label>Food Name</label>
            </Col>
            <Col xs={6} sm={columnSpacing}>
              <label>Calories/100g</label>
            </Col>
            {props.removeFood && (
              <Col xs={12} sm={4}>
                <label>Remove Food</label>
              </Col>
            )}
          </Row>
        </div>
      </li>
      {props.foodList.map((food) => (
        <React.Fragment key={food.foodName}>
          <SingleFoodDetails
            key={food.foodName}
            removeFood={props.removeFood}
            foodName={food.foodName}
            caloriesPer100={food.caloriesPer100}
            columnSpacing={columnSpacing}
          />
        </React.Fragment>
      ))}
    </ul>
  );
}

export default ListOfFoods;
