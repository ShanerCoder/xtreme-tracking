import Head from "next/head";
import FoodList from "../../models/calorieTracking/foodList";
import { getSession } from "next-auth/client";
import { dbConnect } from "../../lib/db-connect";
import LighterDiv from "../../components/ui/LighterDiv";
import DarkerDiv from "../../components/ui/DarkerDiv";
import { useStore } from "../../context";
import { useState } from "react";
import { getValue } from "../../utils/common";
import { useRouter } from "next/router";
import { useLoadingStore } from "../../context/loadingScreen";
import NewFoodSection from "../../components/forms/TrackingForm/FoodList/NewFoodSection";
import ListOfFoods from "../../components/forms/TrackingForm/FoodList/ListOfFoods";

function FoodListPage(props) {
  const router = useRouter();
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  const [state] = useStore();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const user = getValue(state, ["user"], null);

  async function handleAddNewFood(postData) {
    showLoadingScreen({ type: true });
    const bodyData = {
      username: user.username,
      ...postData,
    };

    const response = await fetch("/api/calorieTracking/list_of_foods", {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
      setSuccessMessage(null);
    } else {
      setSuccessMessage("Food Successfully Created!");
      setErrorMessage(null);
    }
    await router.push("/tracking/foodList");
    showLoadingScreen({ type: false });
  }

  async function handleRemoveFood(foodName) {
    showLoadingScreen({ type: true });
    const bodyData = {
      foodName: foodName,
      username: user.username,
    };

    const response = await fetch("/api/calorieTracking/list_of_foods", {
      method: "DELETE",
      body: JSON.stringify(bodyData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
      setSuccessMessage(null);
    } else {
      setSuccessMessage(foodName + " Successfully Removed!");
      setErrorMessage(null);
    }
    await router.push("/tracking/foodList");
    showLoadingScreen({ type: false });
  }

  return (
    <>
      <Head>
        <title>Food List</title>
        <meta
          name="Xtreme Tracking Food List Page"
          content="View the list of all your created Foods here!"
        />
      </Head>
      {successMessage && <p className="successMessage">{successMessage}</p>}
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      {props.errorMessage ? (
        <h1 className="center">{props.errorMessage}</h1>
      ) : (
        <>
          <LighterDiv>
            <h1 className="center">Food List</h1>
            <NewFoodSection addFood={handleAddNewFood} />
          </LighterDiv>
          <DarkerDiv>
            <h2 className="center">List of Added Foods</h2>
            <ListOfFoods
              foodList={props.foodList}
              removeFood={handleRemoveFood}
            />
          </DarkerDiv>
        </>
      )}
    </>
  );
}

export async function getServerSideProps({ req }) {
  try {
    const session = await getSession({ req });
    if (!session) {
      throw new Error("Session not found");
    }

    await dbConnect();

    // Finds food items created by the user
    const foodList = await FoodList.find({
      username: session.user.username,
    }).sort({ foodName: 1 });

    // Returns food items created by the user
    return {
      props: {
        foodList: foodList.map((food) => ({
          foodName: food.foodName,
          caloriesPer100: food.caloriesPer100,
        })),
      },
    };
  } catch (error) {
    return {
      props: {
        errorMessage: "Make an account to view the list of your foods created!",
      },
    };
  }
}

export default FoodListPage;
