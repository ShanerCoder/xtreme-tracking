import { format, isSameMonth, isSameDay, monthStart } from "date-fns";
import classes from "./CalendarCell.module.css";

function CalendarCell(props) {
  const day = props.day;
  let datesOfConsultations = props.datesOfConsultations;
  let formattedDate = format(day, "d");
  const monthStart = props.monthStart;
  const selectedDate = props.selectedDate;
  return (
    <div
      className={`col cell ${
        !isSameMonth(day, monthStart)
          ? "disabled"
          : isSameDay(day, selectedDate)
          ? "selected"
          : ""
      }`}
      key={day}
      onClick={() => {
        props.setSelectedDate(day);
        props.setTitleSelectedDate(day);
      }}
    >
      {datesOfConsultations.indexOf(day.getDate()) != -1 && (
        <img src="/icons/dumbbell.png" className={classes.icon}></img>
      )}
      <span className="number">{formattedDate}</span>
      <span className="bg">{formattedDate}</span>

    </div>
  );
}

export default CalendarCell;
