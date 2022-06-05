import classes from "./ConsultationDetails.module.css";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import UserIcon from "../../ui/UserIcon";
import { useLoadingStore } from "../../../context/loadingScreen";

function ConsultationDetails(props) {
  const router = useRouter();
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  const dateOfConsultation = new Date(
    props.datetimeOfConsultation
  ).toDateString();
  const timeOfConsultation = new Date(
    props.datetimeOfConsultation
  ).toTimeString();

  async function handleLoader(URL) {
    showLoadingScreen({ type: true });
    await router.push(URL);
    showLoadingScreen({ type: false });
  }

  return (
    <li key={props.id} className={classes.detailSection}>
      <h3>
        {props.clientDetailText}
        <label
          className="linkLabel"
          onClick={() => {
            handleLoader("/userProfile/" + props.clientUsername);
          }}
        >
          {props.clientUsername}
        </label>
      </h3>
      <p>
        {dateOfConsultation} - {timeOfConsultation}
      </p>
      <div className={classes.detailBubble}>
        <Row className={classes.detailButtonsSection}>
          <Col className={classes.columnPadding} xs={12} sm={5}>
            <button
              onClick={() => {
                props.removeConsultation(props.id);
              }}
            >
              Remove Consultation
            </button>
          </Col>
          <Col xs={8} sm={5}>
            <button
              onClick={() => {
                router.push("/userProfile/" + props.clientUsername);
              }}
            >
              View Profile
            </button>
          </Col>
          <Col xs={4} sm={{ span: 1, offset: 1 }}>
            <UserIcon username={props.clientUsername} />
          </Col>
        </Row>
      </div>
    </li>
  );
}

export default ConsultationDetails;
