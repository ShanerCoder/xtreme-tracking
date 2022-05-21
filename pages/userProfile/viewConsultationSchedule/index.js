import Calendar from "../../../components/ui/Calendar";
import ConsultationLists from "../../../models/consultationLists";
import UserProfile from "../../../models/userProfile";
import { useState } from "react";
import { getSession } from "next-auth/client";
import { dbConnect } from "../../../lib/db-connect";
import LighterDiv from "../../../components/ui/LighterDiv";
import DarkerDiv from "../../../components/ui/DarkerDiv";
import ConsultationsAtDateSection from "../../../components/forms/ConsultationSchedule/ConsultationsAtDateSection";

function ViewConsultationSchedule(props) {
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  console.log(props.consultationDates);

  const listOfConsultationDates = [];
  props.consultationDates.map((consultation) =>
    listOfConsultationDates.push(new Date(consultation.datetimeOfConsultation))
  );

  function setSelectedDateInfo(date) {
    setSelectedDate(date.toDateString());
  }

  return (
    <>
      <LighterDiv>
        <h1 className="center">
          Viewing Consultations for Date: {selectedDate.toString()}
        </h1>

        <Calendar
          consultationDates={listOfConsultationDates}
          setTitleSelectedDate={setSelectedDateInfo}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </LighterDiv>

      <DarkerDiv>
        {props.consultationsList.length ? (
          <ConsultationsAtDateSection consultations={props.consultationsList} selectedDate={selectedDate} />
        ) : (
          <h3>No Consultations on this Date</h3>
        )}
      </DarkerDiv>
    </>
  );
}

export async function getServerSideProps({ req }) {
  try {
    const session = await getSession({ req });
    if (!session) {
      throw new Error("Session not found");
    }

    console.log(session.user.id);
    const userProfile = await UserProfile.findById({ _id: session.user.id });

    if (userProfile.personalTrainerProfile == false) {
      throw new Error("Not a Personal Trainer");
    }

    await dbConnect();

    const consultationsList = await ConsultationLists.find({
      personalTrainerUsername: session.user.username,
    });
    console.log(consultationsList);

    return {
      props: {
        consultationsList: consultationsList.map((consultation) => ({
          id: consultation._id.toString(),
          clientUsername: consultation.clientUsername,
          datetimeOfConsultation:
            consultation.datetimeOfConsultation.toString(),
        })),
        consultationDates: consultationsList.map((consultation) => ({
          datetimeOfConsultation:
            consultation.datetimeOfConsultation.toString(),
        })),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default ViewConsultationSchedule;
