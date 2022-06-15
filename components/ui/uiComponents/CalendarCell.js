import { format, isSameMonth, isSameDay } from "date-fns";
import classes from "./CalendarCell.module.css";

function CalendarCell(props) {
  const day = props.day;
  const greaterThanToday = props.disableGreaterThanToday ? (day > new Date()) : false;
  let datesOfConsultations = props.datesOfConsultations;
  let formattedDate = format(day, "d");
  const monthStart = props.monthStart;
  const selectedDate = props.selectedDate;
  const imagesrc = props.imagesrc ? props.imagesrc : "dumbbell.png";
  return (
    <div
      className={`col cell ${
        (!isSameMonth(day, monthStart) || greaterThanToday)
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
      {datesOfConsultations.indexOf(day.getDate()) != -1 && (
        <img src={"/icons/" + imagesrc} className={classes.icon}></img>
      )}
      <span className="number">{formattedDate}</span>
      <span className="bg">{formattedDate}</span>
    </div>
  );
}

export default CalendarCell;
