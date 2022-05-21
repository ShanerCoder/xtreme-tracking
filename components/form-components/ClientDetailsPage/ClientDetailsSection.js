import { Col, Row } from "react-bootstrap";
import Card from "../../ui/Card";
import classes from "./ClientDetailsSection.module.css";
import { useRef } from "react";
import UpcomingConsultations from "./UpcomingConsultationsSection";

function ClientDetailsSection(props) {
  const dateInputRef = useRef();

  function handleAddConsultation(event) {
    event.preventDefault();

    props.addConsultation(dateInputRef.current.value);
  }

  return (
    <Row>
      <Col className={classes.columnPadding} xs={12} lg={3}>
        <Card>
          <h2 className={classes.headerDetails}>Add Consultation:</h2>
          <form onSubmit={handleAddConsultation}>
            <div className={classes.control}>
              <input type="datetime-local" required ref={dateInputRef} />
            </div>
            <button className={classes.buttonFormatting}>
              Add Consultation
            </button>
          </form>
        </Card>
      </Col>
      <Col className={classes.columnPadding} xs={12} lg={6}>
        <Card>
          <h2 className={classes.headerDetails}>
            Upcoming Consultations within 14 Days:
          </h2>
          {props.consultationsArray.length ? (
            <UpcomingConsultations
              consultationsArray={props.consultationsArray}
              removeConsultation={props.removeConsultation}
            />
          ) : (
            <h2 className="center" style={{ paddingBottom: "5%" }}>
              No Consultations created for this client
            </h2>
          )}
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
