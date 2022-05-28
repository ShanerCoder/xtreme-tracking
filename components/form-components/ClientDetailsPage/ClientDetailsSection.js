import { Col, Row } from "react-bootstrap";
import Card from "../../ui/Card";
import classes from "./ClientDetailsSection.module.css";
import { useRef, useState } from "react";
import UpcomingConsultations from "./UpcomingConsultationsSection";

function ClientDetailsSection(props) {
  const dateInputRef = useRef();
  const additionalInfoRef = useRef();
  let confirmDelete = false;
  const [deleteButtonText, setDeleteButtonText] = useState("Remove Client");

  function handleAddConsultation(event) {
    event.preventDefault();

    props.addConsultation(dateInputRef.current.value);
  }

  function handleRemoveClientButton(event) {
    event.preventDefault();

    if (!confirmDelete) {
      confirmDelete = true;
      setDeleteButtonText("Click twice to confirm removal of this client.");
    } else {
      props.removeClient(additionalInfoRef.current.value);
      additionalInfoRef.current.value = null;
      confirmDelete = false;
    }
  }

  return (
    <Row>
      <Col className={classes.columnPadding} xs={12} lg={3}>
        <Card>
          <h2 className={classes.headerDetails}>Add Consultation:</h2>
          <form onSubmit={handleAddConsultation}>
            <div className="control lowerWidth">
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
          <form onSubmit={handleRemoveClientButton} className="lowerWidth">
            <p className="center">
              Provide Additional Info into your decision:
            </p>
            <div className="control">
              <textarea
                rows="5"
                required
                id="message"
                placeholder="Additional Context"
                maxLength="400"
                ref={additionalInfoRef}
              />
            </div>
            <button className={classes.buttonFormatting}>
              {deleteButtonText}
            </button>
          </form>
        </Card>
      </Col>
    </Row>
  );
}

export default ClientDetailsSection;
