import { Col, Row } from "react-bootstrap";
import Card from "../../ui/Card";
import classes from "./ClientDetailsSection.module.css";
import UpcomingConsultations from "./UpcomingConsultationsSection";

function ClientDetailsSection(props) {
  const arr = [
    new Date("2022-03-11 13:30:00"),
    new Date("2022-05-28 12:32:00"),
    new Date("2022-05-24"),
    new Date(),
  ];

  return (
    <Row>
      <Col className={classes.columnPadding} xs={12} lg={3}>
        <Card>
          <h2 className={classes.headerDetails}>Add Consultation:</h2>
        </Card>
      </Col>
      <Col className={classes.columnPadding} xs={12} lg={6}>
        <Card>
          <h2 className={classes.headerDetails}>
            Upcoming Consultations within 7 Days:
          </h2>
          <UpcomingConsultations datetimes={arr} />
        </Card>
      </Col>
      <Col className={classes.columnPadding} xs={12} lg={3}>
        <Card>
          <h2 className={classes.headerDetails}>
            Remove Client from your List
          </h2>
          <button className={classes.buttonFormatting}>Remove Client</button>
        </Card>
      </Col>
    </Row>
  );
}

export default ClientDetailsSection;
