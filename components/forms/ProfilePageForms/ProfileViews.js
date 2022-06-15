import { useState } from "react";
import ChangeView from "../../form-components/Common/Views/ChangeView";
import TrainingPlansView from "../../form-components/Common/Views/TrainingPlansView";
import Calendar from "../../ui/Calendar";
import Card from "../../ui/Card";
import DarkerDiv from "../../ui/DarkerDiv";
import LighterDiv from "../../ui/LighterDiv";
import ExercisesAtDateSection from "../TrackingForm/ExercisesAtDateSection";

function ProfileViews(props) {
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
        {currentView == "Training Plans" &&
          (props.ownProfile ? (
            <TrainingPlansView
              trainingPlans={props.trainingPlansList}
              handleLoader={handleLoader}
              handleRemoveTrainingPlan={handleRemoveTrainingPlan}
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
      ;
    </>
  );
}

export default ProfileViews;
