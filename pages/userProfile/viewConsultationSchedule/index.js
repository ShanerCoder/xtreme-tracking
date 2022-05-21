import Calendar from "../../../components/ui/Calendar";
import ConsultationLists from "../../../models/consultationLists";
import UserProfile from "../../../models/userProfile";
import { useState } from "react";
import { getSession } from "next-auth/client";
import { dbConnect } from "../../../lib/db-connect";

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
      <h1 className="center">
        Viewing Consultations for Date: {selectedDate.toString()}
      </h1>

      <Calendar
        consultationDates={listOfConsultationDates}
        setTitleSelectedDate={setSelectedDateInfo}
  />
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
    console.log(error);
    return {
      notFound: true,
    };
  }
}

export default ViewConsultationSchedule;
