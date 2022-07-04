import { Col, Row } from "react-bootstrap";
import AddNewFoodSection from "../FoodHistoryAtDate/AddNewFoodSection";
import FoodsAtDateSection from "../FoodHistoryAtDate/FoodAtDateSection";

function FoodHistoryView(props) {
  return (
    <Row>
      <Col style={{ paddingBottom: "25px" }} xs={12} lg={4}>
        <AddNewFoodSection
          selectedDate={props.selectedDate}
          foodList={props.foodList}
          handleAddFood={props.handleAddFood}
        />
      </Col>
      <Col xs={12} lg={8}>
        {props.foodHistory && props.foodHistory.length ? (
          <FoodsAtDateSection
            removeFoodRecord={props.handleRemoveFoodRecord}
            foods={props.foodHistory}
            selectedDate={props.selectedDate}
          />
        ) : (
          <h3 className="center" style={{ padding: "15px" }}>
            No Foods Have been added for this date
          </h3>
        )}
      </Col>
    </Row>
  );
}

export default FoodHistoryView;
