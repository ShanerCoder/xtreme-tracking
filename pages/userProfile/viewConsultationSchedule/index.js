import Calendar from "../../../components/ui/Calendar";
import { useState } from "react";

function ViewConsultationSchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const arr = [
    new Date("2022-03-11"),
    new Date("2022-05-24"),
    new Date("2022-09-24"),
    new Date(),
  ];

  function getSelectedDateInfo(date) {
    setSelectedDate(date.toDateString());
  }

  return (
    <>
      <Calendar date={arr} setTitleSelectedDate={getSelectedDateInfo} />
      <h1 className="center">Viewing Consultations for Date: {selectedDate.toString()}</h1>
    </>
  );
}

export default ViewConsultationSchedule;
