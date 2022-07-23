import React from "react";

function NotCheckedInView(props) {
  // Const that stores the value of if the selected date is greater than the current date
  const isGreaterThanToday = new Date(props.selectedDate) > new Date();

  // Function that returns the html if a user has planned to visit on the selected date
  function planToVisit() {
    let planToVisit = false;
    props.plannedVisitationDates.map((plannedVisitation) => (
      <React.Fragment key={plannedVisitation.dateOfPlannedVisitation}>
        {new Date(plannedVisitation.dateOfPlannedVisitation).toDateString() ==
          props.selectedDate && <>{(planToVisit = true)}</>}
      </React.Fragment>
    ));
    return planToVisit;
  }

  return (
    <>
      {!isGreaterThanToday ? (
        <>
          <h3 className="center">Not Checked In</h3>
          {planToVisit() && (
            <h3 className="center">Planned to visit the Gym this day</h3>
          )}
        </>
      ) : (
        <>
          {planToVisit() ? (
            <h3 className="center">
              Currently planning to visit the Gym this day
            </h3>
          ) : (
            <>
              <h3 className="center">
                Currently not planning to visit the Gym this day
              </h3>
            </>
          )}
        </>
      )}
    </>
  );
}

export default NotCheckedInView;
