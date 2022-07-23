import { Col, Row } from "react-bootstrap";
import classes from "./ClientDetailsSection.module.css";

function UpcomingConsultations(props) {
  // Variable which is displayed if there are no consultations
  let noConsultations = (
    <h2 className="center" style={{ paddingBottom: "5%" }}>
      No Consultations in the next 14 days
    </h2>
  );

  return (
    <>
      {props.consultationsArray.map((consultation) => (
        <div key={consultation.id}>
          {new Date(consultation.datetimeOfConsultation) > new Date() &&
            new Date(consultation.datetimeOfConsultation) <
              new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000) && (
              <>
                {
                  // removes the noConsultations variable if a consultation is found
                  (noConsultations = null)
                }
                <hr style={{ width: "90%", marginLeft: "5%" }}></hr>
                <Row>
                  <Col xs={12} lg={4}>
                    <h5 className="center">
                      {new Date(
                        consultation.datetimeOfConsultation
                      ).toDateString()}
                    </h5>
                    <h5 className="center" style={{ marginTop: "5%" }}>
                      {new Date(
                        consultation.datetimeOfConsultation
                      ).toTimeString()}
                    </h5>
                  </Col>
                  <Col xs={12} lg={8}>
                    <button
                      className={classes.buttonFormatting}
                      style={{ height: "90%" }}
                      onClick={() => {
                        props.removeConsultation(consultation.id);
                      }}
                    >
                      Remove Consultation
                    </button>
                  </Col>
                </Row>
              </>
            )}
        </div>
      ))}
      {noConsultations}
    </>
  );
}

export default UpcomingConsultations;
