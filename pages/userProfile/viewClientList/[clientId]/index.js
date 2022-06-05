import Head from "next/head";
import { dbConnect } from "../../../../lib/db-connect";
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
  const consultationsArray = props.clientConsultations; //NOTICE try pass in props clientconsultations instead of this

  async function handleAddConsultation(datetimeOfConsultation) {
    const date = new Date(datetimeOfConsultation);
    const newConsultation = {
      personalTrainerUsername: user.username,
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

  async function handleRemoveConsultation(id) {
    const removeConsultation = {
      personalTrainerUsername: props.clientDetails.personalTrainerUsername,
      consultationId: id,
    };

    const response = await fetch(
      "/api/account/consultations/list_of_consultations",
      {
        method: "DELETE",
        body: JSON.stringify(removeConsultation),
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
      setSuccessMessage("Consultation has successfully been removed");
      router.push("/userProfile/viewClientList/" + props.clientDetails.id);
    }
  }

  async function handleRemoveClient(additionalContext) {
    const clientUsername = props.clientDetails.clientUsername;
    const personalTrainerUsername = props.clientDetails.personalTrainerUsername;
    const removeClientBody = {
      clientUsername: clientUsername,
      personalTrainerUsername: personalTrainerUsername,
    };

    const removeClientResponse = await fetch(
      "/api/account/consultations/remove_client",
      {
        method: "DELETE",
        body: JSON.stringify(removeClientBody),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const removeClientdata = await removeClientResponse.json();

    if (removeClientdata.hasError) {
      setErrorMessage(removeClientdata.errorMessage);
      router.push("/userProfile/viewClientList/" + props.clientDetails.id);
    } else {
      const removeClientMessage = {
        usernameToReceive: clientUsername,
        usernameWhoSent: personalTrainerUsername,
        privateMessage:
          user.username +
          " has removed you from their client list.\n\nAdditional Context:\n" +
          additionalContext,
      };

      const removeClientMessageResponse = await fetch(
        "/api/account/account_profile/private_messages",
        {
          method: "POST",
          body: JSON.stringify(removeClientMessage),
          headers: { "Content-Type": "application/json" },
        }
      );
      await removeClientMessageResponse.json();
      router.push("/userProfile/viewClientList");
    }
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
      {successMessage && <p className="successMessage">{successMessage}</p>}
      {errorMessage && (
        <p
          className="center"
          style={{
            textTransform: "capitalize",
            color: "red",
            fontSize: "45px",
          }}
        >
          {errorMessage}
        </p>
      )}
      <LighterDiv>
        <h2 className="center">
          Viewing {props.clientDetails.clientUsername}'s Details
        </h2>
        <ClientDetailsSection
          clientDetails={props.clientDetails}
          consultationsArray={consultationsArray}
          addConsultation={handleAddConsultation}
          removeConsultation={handleRemoveConsultation}
          removeClient={handleRemoveClient}
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
