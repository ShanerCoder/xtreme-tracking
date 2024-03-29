import AddNewPhoto from "../../form-components/Common/AddNewPhoto";
import IndicateVisitationSection from "../../form-components/GymVisitationPage/IndicateVisitationSection";

function OwnViewForm(props) {
  // boolean for isToday can be disabled to allow any selected day to be checked in
  const isToday = new Date().toDateString() == props.selectedDate;
  const isGreaterThanToday = new Date(props.selectedDate) > new Date();
  return (
    <>
      {isToday && !props.checkedIn && (
        <AddNewPhoto
          handleAddPhoto={props.handleCheckIn}
          title={"Add a Photo"}
          buttonText={"Check In"}
          numberInput={"Enter your Weight for today (kg):"}
        />
      )}
      {isGreaterThanToday && (
        <IndicateVisitationSection
          handleSetVisition={props.handleSetVisition}
        />
      )}
    </>
  );
}

export default OwnViewForm;
