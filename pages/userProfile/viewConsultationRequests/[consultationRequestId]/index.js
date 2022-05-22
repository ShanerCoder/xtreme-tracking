import Head from "next/head";
import { dbConnect } from "../../../../lib/db-connect";
import classes from "../../../PageStyling.module.css";
import Cryptr from "cryptr";
import ConsultationRequest from "../../../../models/consultationRequest";
import { getSession } from "next-auth/client";
import LighterDiv from "../../../../components/ui/LighterDiv";
import ViewSelectedDetailForm from "../../../../components/form-components/Common/ViewSelectedDetailForm";
import { useState } from "react";
import { useRouter } from "next/router";
import { useStore } from "../../../../context";
import { getValue } from "../../../../utils/common";

function selectedMessage(props) {
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  const [state] = useStore();
  const user = getValue(state, ["user"], null);

  async function handleAcceptRequest(additionalContext) {
    const acceptedConsultationRequest = {
      id: props.consultationRequest.id,
      additionalContext: additionalContext == "" ? "N/A" : additionalContext,
      usernameWhoSent: user.username,
      usernameToReceive: props.consultationRequest.usernameFrom,
    };
    // send a message to user telling them their request has been accepted, and any additional context
    const acceptresponse = await fetch(
      "/api/account/account_profile/accept_consultation_request",
      {
        method: "POST",
        body: JSON.stringify(acceptedConsultationRequest),
        headers: { "Content-Type": "application/json" },
      }
    );
    const acceptdata = await acceptresponse.json();
    if (acceptdata.hasError) setErrorMessage(acceptdata.errorMessage);
    else {
      const deleteRequest = {
        consultationRequestId: props.consultationRequest.id,
        username: user.username,
      };
      const deleteresponse = await fetch(
        "/api/account/account_profile/consultation_requests",
        {
          method: "DELETE",
          body: JSON.stringify(deleteRequest),
          headers: { "Content-Type": "application/json" },
        }
      );
      const deletedata = await deleteresponse.json();
      if (deletedata.hasError) setErrorMessage(deletedata.errorMessage);
      else router.push("/userProfile/viewConsultationRequests/");
    }
  }

  async function handleDenyRequest(additionalContext) {
    const deniedConsultationRequest = {
      id: props.consultationRequest.id,
      additionalContext: additionalContext == "" ? "N/A" : additionalContext,
      usernameWhoSent: user.username,
      usernameToReceive: props.consultationRequest.usernameFrom,
    };
    // send a message to user telling them their request has been accepted, and any additional context
    const denyresponse = await fetch(
      "/api/account/account_profile/deny_consultation_request",
      {
        method: "POST",
        body: JSON.stringify(deniedConsultationRequest),
        headers: { "Content-Type": "application/json" },
      }
    );
    const denydata = await denyresponse.json();
    if (denydata.hasError) setErrorMessage(denydata.errorMessage);
    else {
      const deleteRequest = {
        consultationRequestId: props.consultationRequest.id,
        username: user.username,
      };
      const deleteresponse = await fetch(
        "/api/account/account_profile/consultation_requests",
        {
          method: "DELETE",
          body: JSON.stringify(deleteRequest),
          headers: { "Content-Type": "application/json" },
        }
      );
      const deletedata = await deleteresponse.json();
      if (deletedata.hasError) setErrorMessage(deletedata.errorMessage);
      else router.push("/userProfile/viewConsultationRequests/");
    }
  }

  return (
    <>
      <Head>
        <title>Selected Consultation Request</title>
        <meta
          name="Xtreme Tracking Selected Consultation Request Page"
          content="View a selected consultation request here!"
        />
      </Head>
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
          Viewing {props.consultationRequest.usernameFrom}'s Request
        </h2>
        <ViewSelectedDetailForm
          detailText={props.consultationRequest.consultationRequest}
          usernameFrom={props.consultationRequest.usernameFrom}
          dateCreated={props.consultationRequest.dateCreated}
          optionOneText="Accept Request"
          optionTwoText="Deny Request"
          handleOptionOne={handleAcceptRequest}
          handleOptionTwo={handleDenyRequest}
          additionalContext={true}
        />
      </LighterDiv>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const consultationRequestId = context.query.consultationRequestId;
    const req = context.req;
    const session = await getSession({ req });
    if (!session) {
      throw new Error("Session not found");
    }
    const user = session.user.username;

    await dbConnect();
    const cryptr = new Cryptr(process.env.SECRET_KEY);

    const filter = { _id: consultationRequestId };
    const request = await ConsultationRequest.findOne(filter);
    if (user == request.usernameToReceive)
      return {
        props: {
          consultationRequest: {
            id: request._id.toString(),
            username: request.usernameToReceive,
            usernameFrom: request.usernameWhoSent,
            consultationRequest: cryptr.decrypt(request.consultationRequest),
            dateCreated: request.createdAt.toString(),
          },
        },
      };
    else
      return {
        notFound: true,
      };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}
export default selectedMessage;
