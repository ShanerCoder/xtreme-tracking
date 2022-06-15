import React from "react";
import CheckedInView from "./CheckedInForm";
import NotCheckedInView from "./NotCheckedInForm";
import OwnViewForm from "./OwnViewForm";

function SelectedDateVisitationForm(props) {
  let checkedInOnDate = false;
  let photoId = null;

  function checkInTrue(attendance) {
    checkedInOnDate = true;
    const index = props.gymAttendanceDates.indexOf(attendance);
    photoId = props.checkInList[index].photoId;
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
        <CheckedInView photoId={photoId} />
      ) : (
        <NotCheckedInView />
      )}
      {props.ownProfile && (
        <OwnViewForm
          selectedDate={props.selectedDate}
          checkedIn={checkedInOnDate}
          handleCheckIn={props.handleCheckIn}
        />
      )}
    </>
  );
}

export default SelectedDateVisitationForm;
