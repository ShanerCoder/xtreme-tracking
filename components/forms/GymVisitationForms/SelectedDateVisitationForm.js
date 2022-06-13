import React from "react";

function SelectedDateVisitationForm(props) {
  let noExercises = (
    <h3 className="center">No Exercises Recorded on this Date</h3>
  );

  console.log(props.gymAttendanceDates[0].toDateString());
  console.log(props.selectedDate);
  return (
    <>
      <h1 className="center">
        Viewing Gym Visitation for: {props.selectedDate}
      </h1>
      {props.gymAttendanceDates.map((attendance) => (
        <React.Fragment key={attendance}>
          {new Date(attendance).toDateString() == props.selectedDate && (
            <>
              {(noExercises = null)}
              <h2 className="center">User has checked in on this day</h2>
            </>
          )}
        </React.Fragment>
      ))}
      {noExercises}
    </>
  );
}

export default SelectedDateVisitationForm;
