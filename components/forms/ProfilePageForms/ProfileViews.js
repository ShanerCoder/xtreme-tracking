import { useState } from "react";
import { useRouter } from "next/router";
import { useLoadingStore } from "../../../context/loadingScreen";
import ChangeView from "../../form-components/Common/Views/ChangeView";
import TrainingPlansView from "../../form-components/Common/Views/TrainingPlansView";
import Calendar from "../../ui/Calendar";
import Card from "../../ui/Card";
import DarkerDiv from "../../ui/DarkerDiv";
import LighterDiv from "../../ui/LighterDiv";
import ExercisesAtDateSection from "../TrackingForm/ExerciseHistoryAtDate/ExercisesAtDateSection";
import GalleryView from "./Views/GalleryView";
import FoodsAtDateSection from "../TrackingForm/FoodHistoryAtDate/FoodAtDateSection";

function ProfileViews(props) {
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  const router = useRouter();
  const [currentView, setCurrentView] = useState("Exercise History");
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());

  async function handleLoader(URL) {
    showLoadingScreen({ type: true });
    await router.push(URL);
    showLoadingScreen({ type: false });
  }

  return (
    <>
      <DarkerDiv>
        <h1 className="center" style={{ paddingBottom: "25px" }}>
          Currently viewing: {currentView}
        </h1>
        <ChangeView setCurrentView={setCurrentView} profileView={true} />
        {currentView == "Exercise History" && (
          <>
            <h2 className="center">
              Exercise History for date: {selectedDate}
            </h2>
            <Calendar
              listOfDates={props.listOfExerciseHistoryDates}
              setTitleSelectedDate={setSelectedDate}
            />
          </>
        )}
        {currentView == "Food History" && (
          <>
            <h2 className="center">Food History for date: {selectedDate}</h2>
            <Calendar
              listOfDates={props.listOfFoodHistoryDates}
              setTitleSelectedDate={setSelectedDate}
              imagesrc={"apple.png"}
            />
          </>
        )}
        {currentView == "Gallery" &&
          (props.ownProfile ? (
            <GalleryView
              galleryPhotoList={props.galleryPhotoList}
              handleLoader={handleLoader}
              handleUpdatePrivacyOfPhoto={props.handleUpdatePrivacyOfPhoto}
              handleRemovePhoto={props.handleRemovePhoto}
            />
          ) : (
            <GalleryView
              galleryPhotoList={props.galleryPhotoList}
              handleLoader={handleLoader}
            />
          ))}
        {currentView == "Training Plans" &&
          (props.ownProfile ? (
            <TrainingPlansView
              trainingPlans={props.trainingPlansList}
              handleLoader={handleLoader}
              handleRemoveTrainingPlan={props.handleRemoveTrainingPlan}
            />
          ) : (
            <TrainingPlansView
              trainingPlans={props.trainingPlansList}
              handleLoader={handleLoader}
            />
          ))}
      </DarkerDiv>
      {currentView == "Exercise History" && (
        <LighterDiv>
          {props.exerciseHistory && props.exerciseHistory.length ? (
            <ExercisesAtDateSection
              username={props.user.username}
              exercises={props.exerciseHistory}
              selectedDate={selectedDate}
            />
          ) : (
            <Card>
              <h3 className="center" style={{ padding: "15px" }}>
                No Exercises Have been added
              </h3>
            </Card>
          )}
        </LighterDiv>
      )}
      {currentView == "Food History" && (
        <LighterDiv>
          {props.exerciseHistory && props.exerciseHistory.length ? (
            <FoodsAtDateSection
              username={props.user.username}
              foods={props.foodHistory}
              selectedDate={selectedDate}
            />
          ) : (
            <Card>
              <h3 className="center" style={{ padding: "15px" }}>
                No Foods Have been added
              </h3>
            </Card>
          )}
        </LighterDiv>
      )}
    </>
  );
}

export default ProfileViews;
