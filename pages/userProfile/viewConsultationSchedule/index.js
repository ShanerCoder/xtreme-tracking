import Calendar from "../../../components/ui/Calendar";
import ClientList from "../../../models/clientList";
import ConsultationLists from "../../../models/consultationLists";
import UserProfile from "../../../models/userProfile";
import { useState } from "react";
import { getSession } from "next-auth/client";
import { dbConnect } from "../../../lib/db-connect";
import LighterDiv from "../../../components/ui/LighterDiv";
import DarkerDiv from "../../../components/ui/DarkerDiv";
import ConsultationsAtDateSection from "../../../components/forms/ConsultationSchedule/ConsultationsAtDateSection";
import NewConsultationSection from "../../../components/forms/ConsultationSchedule/NewConsultationSection";
import { useStore } from "../../../context";
import { getValue } from "../../../utils/common";
import { useRouter } from "next/router";

function ViewConsultationSchedule(props) {
  const router = useRouter();
  const [state] = useStore();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const user = getValue(state, ["user"], null);
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());

  const listOfConsultationDates = [];
  props.consultationDates.map((consultation) =>
    listOfConsultationDates.push(new Date(consultation.datetimeOfConsultation))
  );

  function setSelectedDateInfo(date) {
    setSelectedDate(date.toDateString());
  }

  async function handleAddConsultation(postData) {
    const bodyData = {
      ...postData,
      personalTrainerUsername: user.username,
    };

    const response = await fetch(
      "/api/account/consultations/list_of_consultations",
      {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
      setSuccessMessage(null);
    } else {
      setSuccessMessage("Consultation Successfully Created!");
      setErrorMessage(null);
    }
    router.push("/userProfile/viewConsultationSchedule");
  }

  async function handleRemoveConsultation(consultationId) {
    const bodyData = {
      consultationId: consultationId,
      personalTrainerUsername: user.username,
    };

    const response = await fetch(
      "/api/account/consultations/list_of_consultations",
      {
        method: "DELETE",
        body: JSON.stringify(bodyData),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
      setSuccessMessage(null);
    } else {
      setSuccessMessage("Consultation Successfully Removed!");
      setErrorMessage(null);
    }
    router.push("/userProfile/viewConsultationSchedule");
  }

  return (
    <>
      {successMessage && (
        <p style={{ textTransform: "capitalize", color: "green" }}>
          {successMessage}
        </p>
      )}
      {errorMessage && (
        <p style={{ textTransform: "capitalize", color: "red" }}>
          {errorMessage}
        </p>
      )}
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
        <NewConsultationSection
          addConsultation={handleAddConsultation}
          clientsList={props.clientsList}
          selectedDate={selectedDate}
        />
      </DarkerDiv>

      <LighterDiv>
        {props.consultationsList.length ? (
          <ConsultationsAtDateSection
            removeConsultation={handleRemoveConsultation}
            consultations={props.consultationsList}
            selectedDate={selectedDate}
          />
        ) : (
          <h3>No Consultations on this Date</h3>
        )}
      </LighterDiv>
    </>
  );
}

export async function getServerSideProps({ req }) {
  try {
    const session = await getSession({ req });
    if (!session) {
      throw new Error("Session not found");
    }

    const userProfile = await UserProfile.findById({ _id: session.user.id });

    if (userProfile.personalTrainerProfile == false) {
      throw new Error("Not a Personal Trainer");
    }

    await dbConnect();

    const consultationsList = await ConsultationLists.find({
      personalTrainerUsername: session.user.username,
    }).sort({ datetimeOfConsultation: 1 });
    const clientsList = await ClientList.find({
      personalTrainerUsername: session.user.username,
    });

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
        clientsList: clientsList.map((client) => ({
          clientUsername: client.clientUsername,
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
