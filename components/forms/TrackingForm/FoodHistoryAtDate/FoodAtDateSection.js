import FoodDetails from "./FoodDetails";
import React, { useEffect, useState } from "react";
import Card from "../../../ui/Card";

function FoodsAtDateSection(props) {
  // State to store the number of total calories
  const [totalCalories, setTotalCalories] = useState(0);

  // Variable that displays html if there are no foods added for the selected day
  let noFoods = <h3 className="center">No Foods Recorded on this Date</h3>;

  // UseEffect that runs upon code execution
  // Counts the total number of calories for the selected day
  useEffect(() => {
    calorieCount();
  }, [props.selectedDate]);

  // Function to count the number of calories for the selected day
  function calorieCount() {
    let calorieCount = 0;
    props.foods.forEach((food) => {
      if (new Date(food.dateEaten).toDateString() == props.selectedDate)
        calorieCount += food.totalCalories;
    });
    setTotalCalories(calorieCount);
  }

  return (
    <>
      <Card>
        <h3 className="center" style={{ padding: "15px" }}>
          Total Calories for This Day: {totalCalories}
        </h3>
      </Card>
      <ul className="list" style={{ paddingTop: "1%" }}>
        {props.foods.map((food) => (
          <React.Fragment key={food.id}>
            {new Date(food.dateEaten).toDateString() == props.selectedDate && (
              <>
                {(noFoods = null)}
                <FoodDetails
                  removeFoodRecord={props.removeFoodRecord}
                  id={food.id}
                  foodName={food.foodName}
                  gramsEaten={food.gramsEaten}
                  totalCalories={food.totalCalories}
                  removeButtonText={"Remove Food Record"}
                  username={props.username}
                />
              </>
            )}
          </React.Fragment>
        ))}
      </ul>
      {noFoods || (
        <h3 className="center" style={{ paddingTop: "25px" }}>
          No more Foods recorded for this Day
        </h3>
      )}
    </>
  );
}

export default FoodsAtDateSection;
