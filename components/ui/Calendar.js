import React from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  addMonths,
  subMonths,
} from "date-fns";
import { useState } from "react";
import CalendarCell from "./uiComponents/CalendarCell";
import classes from "./Calendar.module.css";
import { Col, Row } from "react-bootstrap";

function Calendar(props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  function renderHeader() {
    const dateFormat = "MMMM yyyy";

    return (
      <Row>
        <Col xs={2}>
          <div className={"col col-start " + classes.monthNavigatiorDivs}>
            <div
              className={"icon " + classes.monthNavigatiors}
              onClick={prevMonth}
            >
              chevron_left
            </div>
          </div>
        </Col>
        <Col xs={8}>
          <h4 className={classes.monthHeader}>
            {format(currentMonth, dateFormat)}
          </h4>
        </Col>
        <Col xs={2}>
          <div
            className={"col col-end " + classes.monthNavigatiorDivs}
            onClick={nextMonth}
          >
            <div className={"icon " + classes.monthNavigatiors}>
              chevron_right
            </div>
          </div>
        </Col>
      </Row>
    );
  }

  function renderDays() {
    const dateFormat = "EE";
    const days = [];

    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <span
          className={
            "col col-center " + classes.daysText + " " + classes.daysColumn
          }
          key={i}
        >
          {format(addDays(startDate, i), dateFormat)}
        </span>
      );
    }

    return <div className="days row">{days}</div>;
  }

  function renderCells() {
    let datesOfConsultations = [];

    if (props.listOfDates) {
      const currentMonthNumber = currentMonth.getMonth();
      props.listOfDates.forEach((date) => {
        if (
          date.getMonth() == currentMonthNumber &&
          date.getFullYear() == currentMonth.getFullYear()
        )
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
        days.push(
          <CalendarCell
            key={day}
            day={day}
            datesOfConsultations={datesOfConsultations}
            monthStart={monthStart}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setTitleSelectedDate={props.setTitleSelectedDate}
            imagesrc={props.imagesrc}
            imageSrcPastToday={props.imageSrcPastToday}
            maximumDate={props.maximumDate}
            includeTodayForImgSrcPastToday={props.includeTodayForImgSrcPastToday}
          />
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
