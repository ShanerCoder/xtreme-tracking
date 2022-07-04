import Card from "../../../ui/Card";
import { Col, Row } from "react-bootstrap";
import { useRef } from "react";

function NewFoodSection(props) {
  const foodNameRef = useRef();
  const caloriesPer100Ref = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const postData = {
      foodName: foodNameRef.current.value,
      caloriesPer100: caloriesPer100Ref.current.value,
    };

    props.addFood(postData);
  }

  return (
    <>
      <Card>
        <h2 className="center" style={{ padding: "15px" }}>
          Create a new Food Item:
        </h2>
        <form onSubmit={handleSubmit}>
          <Row className="lowerWidth">
            <Col className="control" xs={12} lg={6}>
              <label htmlFor={"foodNameInput"}>Name of Food</label>
              <input
                type="text"
                required
                id="foodNameInput"
                placeholder="Name"
                maxLength="40"
                ref={foodNameRef}
              />
            </Col>
            <Col className="control" xs={12} lg={6}>
              <label htmlFor={"caloriesPer100"}>Calories per 100g</label>
              <input
                type={"number"}
                step="0.01"
                placeholder="Calories/100g"
                max={1000}
                required
                id={"caloriesPer100"}
                ref={caloriesPer100Ref}
              ></input>
            </Col>
          </Row>
          <div className="lowerWidth">
            <button className="lowerWidth" style={{ marginBottom: "15px" }}>
              Add Food
            </button>
          </div>
        </form>
      </Card>
    </>
  );
}

export default NewFoodSection;
