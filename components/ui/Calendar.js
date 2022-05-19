import React from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  isSameMonth,
  isSameDay,
  parse,
  addMonths,
  subMonths,
  getDate,
} from "date-fns";
import { useRouter } from "next/router";
import { useState } from "react";
import { render } from "react-dom";

function Calendar(props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  function renderHeader() {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  function renderDays() {
    const dateFormat = "EEEE";
    const days = [];

    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  function renderCells() {
    let datesOfConsultations = [];

    if (props.date) {
      const currentMonthNumber = currentMonth.getMonth();
      props.date.forEach((date) => {
        if (date.getMonth() == currentMonthNumber)
          datesOfConsultations.push(date.getDate());
      });
    }

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
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
              props.setTitleSelectedDate(day);
              //onDateClick(parse(cloneDay));
              //router.push("/userProfile/viewConsultationSchedule/" + cloneDay);
            }}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
            {datesOfConsultations.indexOf(day.getDate()) != -1 && (
              <img
                src="/icons/dumbbell.png"
                style={{ paddingTop: "25px", width: "45px" }}
              ></img>
            )}
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}

export default Calendar;
