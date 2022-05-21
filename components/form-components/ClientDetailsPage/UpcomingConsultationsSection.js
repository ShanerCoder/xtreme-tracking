import { Col, Row } from "react-bootstrap";
import classes from "./ClientDetailsSection.module.css";

function UpcomingConsultations(props) {
  return (
    <>
      {props.datetimes.map((date) => (
        <div key={date}>
          {new Date(date) > new Date() &&
            new Date(date) <
              new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000) && (
              <>
                <hr style={{ width: "90%", marginLeft: "5%" }}></hr>
                <Row>
                  <Col xs={12} lg={4}>
                    <h5 className="center">
                      {date.toDateString()}
                    </h5>
                    <h5 className="center" style={{ marginTop: "5%" }}>
                      {date.toTimeString()}
                    </h5>
                  </Col>
                  <Col xs={12} lg={8}>
                    <button
                      className={classes.buttonFormatting}
                      style={{ height: "90%" }}
                    >
                      Remove Consultation
                    </button>
                  </Col>
                </Row>
              </>
            )}
        </div>
      ))}
    </>
  );
}

export default UpcomingConsultations;
