import { useState } from "react";
import SelectedDateVisitationForm from "../../../components/forms/GymVisitationForms/SelectedDateVisitationForm";
import Calendar from "../../../components/ui/Calendar";
import DarkerDiv from "../../../components/ui/DarkerDiv";
import LighterDiv from "../../../components/ui/LighterDiv";
import { dbConnect } from "../../../lib/db-connect";
import { getSession } from "next-auth/client";

function GymVisitation(props) {
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());

  const gymAttendanceDates = [new Date('2021-06-06'), new Date()];

  return (
    <>
      <LighterDiv>
        <h1 className="center">Gym Visitation</h1>
        <Calendar
          listOfDates={gymAttendanceDates}
          setTitleSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
          imagesrc="human.png"
        />
      </LighterDiv>
      <DarkerDiv>
        <SelectedDateVisitationForm
          selectedDate={selectedDate}
          gymAttendanceDates={gymAttendanceDates}
          ownProfile={props.ownProfile}
        />
      </DarkerDiv>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const username = context.query.username;
    const req = context.req;
    const session = await getSession({ req });

    //await dbConnect();
    if (session.user.username == username) {
      return {
        props: {
          ownProfile: true,
        },
      };
    } else
      return {
        props: {
          ownProfile: false,
        },
      };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default GymVisitation;
