import Calendar from "../../../components/ui/Calendar";

function ViewConsultationSchedule() {
  const arr = [
    new Date("2022-03-11"),
    new Date("2022-05-24"),
    new Date("2022-09-24"),
    new Date(),
  ];

  return <Calendar date={arr} />;
}

export default ViewConsultationSchedule;
