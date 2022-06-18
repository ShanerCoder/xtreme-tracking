import CheckInSection from "../../form-components/GymVisitationPage/CheckInSection";
import IndicateVisitationSection from "../../form-components/GymVisitationPage/IndicateVisitationSection";

function OwnViewForm(props) {
  // boolean for isToday can be enabled to only allow for the current day to be checked in
  const isToday = new Date().toDateString() == props.selectedDate;
  const isGreaterThanToday = new Date(props.selectedDate) > new Date();
  return (
    <>
      {isToday && !props.checkedIn && (
        <CheckInSection handleCheckIn={props.handleCheckIn} />
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
