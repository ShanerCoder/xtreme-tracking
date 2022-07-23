import React from "react";
import CheckedInView from "./CheckedInForm";
import NotCheckedInView from "./NotCheckedInForm";
import OwnViewForm from "./OwnViewForm";

function SelectedDateVisitationForm(props) {
  let checkedInOnDate = false;
  let photoId = null;
  let weight = null;

  // Updates the values if this method is called
  // This method is called once it is confirmed that the user has checked in on this date
  function checkInTrue(attendance) {
    checkedInOnDate = true;
    const index = props.gymAttendanceDates.indexOf(attendance);
    photoId = props.checkInList[index].photoId;
    weight = props.checkInList[index].weight;
  }

  return (
    <>
      <h1 className="center">
        Viewing Gym Visitation for: {props.selectedDate}
      </h1>
      {props.gymAttendanceDates.map((attendance) => (
        <React.Fragment key={attendance}>
          {new Date(attendance).toDateString() == props.selectedDate && (
            <>{checkInTrue(attendance)}</>
          )}
        </React.Fragment>
      ))}

      {checkedInOnDate ? (
        <CheckedInView photoId={photoId} weight={weight} />
      ) : (
        <NotCheckedInView
          selectedDate={props.selectedDate}
          plannedVisitationDates={props.plannedVisitationDates}
        />
      )}
      {props.ownProfile && (
        <OwnViewForm
          selectedDate={props.selectedDate}
          checkedIn={checkedInOnDate}
          handleCheckIn={props.handleCheckIn}
          handleSetVisition={props.handleSetVisition}
        />
      )}
    </>
  );
}

export default SelectedDateVisitationForm;
