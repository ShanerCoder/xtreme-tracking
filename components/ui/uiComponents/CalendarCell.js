import { format, isSameMonth, isSameDay } from "date-fns";
import classes from "./CalendarCell.module.css";

function CalendarCell(props) {
  const day = props.day;

  // Const to identify if the date is greater than the maximum date allowed
  const greaterThanMax = props.maximumDate ? day > props.maximumDate : false;
  let datesOfConsultations = props.datesOfConsultations;
  let datesOfSecondaryConsultations = props.datesOfSecondaryConsultations;
  let formattedDate = format(day, "d");
  const monthStart = props.monthStart;
  const selectedDate = props.selectedDate;

  // Function to identify which image source should be displayed on the cell
  function imageSource() {
    const greaterThanToday = day > new Date() ? true : false;
    const includeToday = props.includeTodayForImgSrcPastToday
      ? isSameDay(new Date(), day)
      : false;
    let imagesrc = props.imagesrc ? props.imagesrc : "dumbbell.png";
    if (props.imageSrcPastToday && (greaterThanToday || includeToday)) {
      imagesrc = props.imageSrcPastToday;
    } else if (datesOfSecondaryConsultations.length > 0) {
      if (
        datesOfConsultations.indexOf(day.getDate()) != -1 &&
        datesOfSecondaryConsultations.indexOf(day.getDate()) != -1
      ) {
        imagesrc = props.thirdImagesrc;
      } else if (datesOfSecondaryConsultations.indexOf(day.getDate()) != -1) {
        imagesrc = props.secondImagesrc;
      }
    }

    return imagesrc;
  }

  return (
    <div
      className={`col cell ${
        !isSameMonth(day, monthStart) || greaterThanMax
          ? "disabled"
          : isSameDay(day, selectedDate)
          ? "selected"
          : ""
      }`}
      key={day}
      onClick={() => {
        props.setSelectedDate(day);
        props.setTitleSelectedDate(new Date(day).toDateString());
      }}
    >
      {(datesOfConsultations.indexOf(day.getDate()) != -1 ||
        datesOfSecondaryConsultations.indexOf(day.getDate()) != -1) &&
        isSameMonth(day, monthStart) && (
          <img
            src={"/icons/" + imageSource()}
            alt="Calendar Image"
            className={classes.icon}
          ></img>
        )}
      <span className="number">{formattedDate}</span>
      <span className="bg">{formattedDate}</span>
    </div>
  );
}

export default CalendarCell;
