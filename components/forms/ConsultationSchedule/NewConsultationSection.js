import classes from "./NewConsultationSection.module.css";
import { useRef } from "react";
import Card from "../../ui/Card";
import { Col, Row } from "react-bootstrap";

function NewConsultationSection(props) {
  const ClientDropdownRef = useRef();
  const timeOfConsultationRef = useRef();
  const clientsList = props.clientsList;

  function handleSubmit(event) {
    event.preventDefault();

    const datetimeOfConsultation = new Date(
      props.selectedDate + " " + timeOfConsultationRef.current.value
    );

    const postData = {
      datetimeOfConsultation: datetimeOfConsultation,
      clientUsername: ClientDropdownRef.current.value,
    };

    props.addConsultation(postData);

    timeOfConsultationRef.current.value = null;
    ClientDropdownRef.current.value = null;
  }

  return (
    <>
      <Card>
        <h3 className="center" style={{ padding: "15px" }}>
          Create a New Consultation for date: {props.selectedDate}
        </h3>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col
              className={"control " + classes.timeFormatting}
              xs={12}
              lg={{ span: 5, offset: 1 }}
            >
              <label htmlFor={"timeInput"}>Time of New Consultation</label>
              <input
                type={"time"}
                required
                id={"timeInput"}
                ref={timeOfConsultationRef}
              />
            </Col>
            <Col className="control" xs={12} lg={5}>
              <label htmlFor={"clientInput"}>Client of New Consultation</label>
              <select
                type={"datalist"}
                required
                id={"clientInput"}
                ref={ClientDropdownRef}
              >
                {clientsList.map((client) => (
                  <option
                    key={client.clientUsername}
                    value={client.clientUsername}
                  >
                    {client.clientUsername}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
          <div className="actions">
            <button className={classes.newConsultationButton}>Create new Consultation</button>
          </div>
        </form>
      </Card>
    </>
  );
}

export default NewConsultationSection;
