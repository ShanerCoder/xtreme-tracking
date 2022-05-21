import Head from "next/head";
import { dbConnect } from "../../../../lib/db-connect";
import classes from "../../../PageStyling.module.css";
import ClientList from "../../../../models/clientList";
import ConsultationLists from "../../../../models/consultationLists";
import { getSession } from "next-auth/client";
import LighterDiv from "../../../../components/ui/LighterDiv";
import { useState } from "react";
import { useRouter } from "next/router";
import { useStore } from "../../../../context";
import { getValue } from "../../../../utils/common";
import ClientDetailsSection from "../../../../components/form-components/ClientDetailsPage/ClientDetailsSection";

function selectedClient(props) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const router = useRouter();
  const [state] = useStore();
  const user = getValue(state, ["user"], null);
  const [deleteButtonText, setDeleteButtonText] = useState(
    "Permanently Delete This Message"
  );
  let confirmDelete = false;
  const consultationsArray = props.clientConsultations;

  async function handleAddConsultation(datetimeOfConsultation) {
    const date = new Date(datetimeOfConsultation);
    const newConsultation = {
      personalTrainerUsername: props.clientDetails.personalTrainerUsername,
      clientUsername: props.clientDetails.clientUsername,
      datetimeOfConsultation: date,
    };

    const response = await fetch(
      "/api/account/consultations/list_of_consultations",
      {
        method: "POST",
        body: JSON.stringify(newConsultation),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
      setSuccessMessage(null);
      router.push("/userProfile/viewClientList/" + props.clientDetails.id);
    } else {
      setErrorMessage(null);
      setSuccessMessage("Consultation has successfully been added");
      router.push("/userProfile/viewClientList/" + props.clientDetails.id);
    }
  }

  async function handleDelete() {
    const deleteMessage = {
      username: user.username,
      messageId: props.clientDetails.id,
    };
    const response = await fetch(
      "/api/account/account_profile/private_messages",
      {
        method: "DELETE",
        body: JSON.stringify(deleteMessage),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
      router.push("/viewMessages/" + props.privateMessage.id);
    } else {
      setErrorMessage(null);
      router.push("/viewMessages");
    }
  }

  function handleDeleteButton() {
    if (!confirmDelete) {
      confirmDelete = true;
      setDeleteButtonText("Click twice to confirm deletion of this message.");
    } else {
      handleDelete();
    }
  }

  function handleWriteResponse() {
    router.push(
      "/userProfile/privateMessage/" + props.privateMessage.usernameFrom
    );
  }

  return (
    <>
      <Head>
        <title>Client Details</title>
        <meta
          name="Xtreme Tracking Client Details Page"
          content="View a selected Client's details here!"
        />
      </Head>
      {successMessage && (
        <p style={{ textTransform: "capitalize", color: "green" }}>
          {successMessage}
        </p>
      )}
      {errorMessage && (
        <p
          className="center"
          style={{
            textTransform: "capitalize",
            color: "red",
            "font-size": "45px",
          }}
        >
          {errorMessage}
        </p>
      )}
      <LighterDiv>
        <h2 className={(classes.padding_top, "center")}>
          Viewing {props.clientDetails.clientUsername}'s Details
        </h2>
        <ClientDetailsSection
          clientDetails={props.clientDetails}
          consultationsArray={consultationsArray}
          addConsultation={handleAddConsultation}
        />
      </LighterDiv>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const clientId = context.query.clientId;
    const req = context.req;
    const session = await getSession({ req });
    if (!session) {
      throw new Error("Session not found");
    }
    const user = session.user.username;

    await dbConnect();

    const clientFilter = { _id: clientId };
    const clientDetails = await ClientList.findOne(clientFilter);
    const consultationsFilter = {
      personalTrainerUsername: clientDetails.personalTrainerUsername,
      clientUsername: clientDetails.clientUsername,
    };
    const clientConsultations = await ConsultationLists.find(
      consultationsFilter
    ).sort({ datetimeOfConsultation: 1 });
    if (user == clientDetails.personalTrainerUsername && clientConsultations)
      return {
        props: {
          clientDetails: {
            id: clientDetails._id.toString(),
            personalTrainerUsername: clientDetails.personalTrainerUsername,
            clientUsername: clientDetails.clientUsername,
          },
          clientConsultations: clientConsultations.map((consultation) => ({
            id: consultation._id.toString(),
            datetimeOfConsultation:
              consultation.datetimeOfConsultation.toString(),
          })),
        },
      };
    else if (user == clientDetails.personalTrainerUsername) {
      return {
        props: {
          clientDetails: {
            id: clientDetails._id.toString(),
            personalTrainerUsername: clientDetails.personalTrainerUsername,
            clientUsername: clientDetails.clientUsername,
          },
        },
      };
    } else
      return {
        notFound: true,
      };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
export default selectedClient;
