import classes from "./AddNewFoodSection.module.css";
import { useRef, useState } from "react";
import Card from "../../../ui/Card";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import { useLoadingStore } from "../../../../context/loadingScreen";

function AddNewFoodSection(props) {
  const router = useRouter();
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  const foodDropdownRef = useRef();
  const gramsEatenRef = useRef();

  async function handleLoader(URL) {
    showLoadingScreen({ type: true });
    await router.push(URL);
    showLoadingScreen({ type: false });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const selectedDate = new Date(props.selectedDate);
    selectedDate.setHours(1, 0, 0, 0);
    // const postData = {
    //   foodName: foodDropdownRef.current.value,
    //   gramsEaten: gramsEatenRef.current.value,
    //   dateEaten: selectedDate,
    // };
    // props.addFood(postData);
  }

  return (
    <>
      <Card>
        <h3 className="center" style={{ padding: "15px" }}>
          Add in a new Food Eaten on date:
        </h3>
        <h3 className="center" style={{ paddingBottom: "15px" }}>
          {props.selectedDate}
        </h3>
        <form onSubmit={handleSubmit}>
          <Row className="lowerWidth">
            <Col className="control" xs={12}>
              <label htmlFor={"foodInput"}>Name of Food</label>
              <select
                type={"datalist"}
                required
                id={"foodInput"}
                ref={foodDropdownRef}
              >
                {props.foodList.map((food) => (
                  <option key={food.foodName} value={food.foodName}>
                    {food.foodName}
                  </option>
                ))}
              </select>
            </Col>
          </Row>

          <Row className="lowerWidth">
            <Col className="control" xs={12}>
              <label htmlFor={"gramsEaten"}>Grams Eaten (g)</label>
              <input
                type={"number"}
                step="0.01"
                max={10000}
                ref={gramsEatenRef}
                id={"gramsEaten"}
                required
              />
            </Col>
          </Row>

          <div className="lowerWidth">
            <button className={"lowerWidth " + classes.buttonPadding}>
              Add Food
            </button>
          </div>
        </form>
        <form>
          <div className={"control " + classes.notListedLabel}>
            <label>Food not listed?</label>
          </div>
          <div className={"lowerWidth " + classes.linkStyling}>
            <label
              className="linkLabel"
              onClick={() => {
                handleLoader("/tracking/foodList");
              }}
            >
              Create New Food Item
            </label>
          </div>
        </form>
      </Card>
    </>
  );
}

export default AddNewFoodSection;
