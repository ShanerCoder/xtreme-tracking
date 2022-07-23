import Head from "next/head";
import { dbConnect } from "../../../../lib/db-connect";
import ClientList from "../../../../models/personalTrainer/clientList";
import ConsultationLists from "../../../../models/personalTrainer/consultationLists";
import { getSession } from "next-auth/client";
import LighterDiv from "../../../../components/ui/LighterDiv";
import { useState } from "react";
import { useRouter } from "next/router";
import { useStore } from "../../../../context";
import { getValue } from "../../../../utils/common";
import ClientDetailsSection from "../../../../components/form-components/ClientDetailsPage/ClientDetailsSection";
import { useLoadingStore } from "../../../../context/loadingScreen";

function selectedClient(props) {
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const router = useRouter();
  const [state] = useStore();
  const user = getValue(state, ["user"], null);
  const consultationsArray = props.clientConsultations; //NOTICE try pass in props clientconsultations instead of this

  // Function to add consultation
  async function handleAddConsultation(datetimeOfConsultation) {
    showLoadingScreen({ type: true });
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
      await router.push(
        "/userProfile/viewClientList/" + props.clientDetails.id
      );
    } else {
      setErrorMessage(null);
      setSuccessMessage("Consultation has successfully been added");
      await router.push(
        "/userProfile/viewClientList/" + props.clientDetails.id
      );
    }
    showLoadingScreen({ type: false });
  }

  // Function to remove consultation
  async function handleRemoveConsultation(id) {
    showLoadingScreen({ type: true });
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
      await router.push(
        "/userProfile/viewClientList/" + props.clientDetails.id
      );
    } else {
      setErrorMessage(null);
      setSuccessMessage("Consultation has successfully been removed");
      await router.push(
        "/userProfile/viewClientList/" + props.clientDetails.id
      );
    }
    showLoadingScreen({ type: false });
  }

  // Function to remove client from clientsList
  async function handleRemoveClient(additionalContext) {
    showLoadingScreen({ type: true });
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
      await router.push(
        "/userProfile/viewClientList/" + props.clientDetails.id
      );
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
      await router.push("/userProfile/viewClientList");
    }
    showLoadingScreen({ type: false });
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

    // Finds client details
    const clientDetails = await ClientList.findOne(clientFilter);
    const consultationsFilter = {
      personalTrainerUsername: clientDetails.personalTrainerUsername,
      clientUsername: clientDetails.clientUsername,
    };

    // Finds consultations with selected client
    const clientConsultations = await ConsultationLists.find(
      consultationsFilter
    ).sort({ datetimeOfConsultation: 1 });

    // Returns client details and consultations
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
      // Returns client details
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
