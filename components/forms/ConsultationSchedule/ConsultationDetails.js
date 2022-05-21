import classes from "./ConsultationDetails.module.css";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import UserIcon from "../../ui/UserIcon";
import Link from "next/link";

function ConsultationsAtDateSection(props) {
  const router = useRouter();
  const dateOfConsultation = new Date(
    props.datetimeOfConsultation
  ).toDateString();
  const timeOfConsultation = new Date(
    props.datetimeOfConsultation
  ).toTimeString();
  return (
    <li key={props.id} className={classes.detailSection}>
      <h3>
        {props.clientDetailText}
        <Link href={"/userProfile/" + props.clientUsername}>
          {props.clientUsername}
        </Link>
      </h3>
      <p>
        {dateOfConsultation} - {timeOfConsultation}
      </p>
      <div className={classes.detailBubble}>
        <Row className={classes.detailButtonsSection}>
          <Col className={classes.columnPadding} xs={12} sm={5}>
            <button
              onClick={() => {
                router.push(props.viewDetailURL);
              }}
            >
              View {props.detailName}
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

export default ConsultationsAtDateSection;
