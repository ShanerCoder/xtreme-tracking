import { Col, Row } from "react-bootstrap";

function ChangeView(props) {
  return (
    <Row>
      <Col xs={12} sm={3} style={{ paddingBottom: "25px" }}>
        <button
          className="lowerWidth"
          onClick={() => {
            props.setCurrentView("Exercise History");
          }}
        >
          View Exercise History
        </button>
      </Col>
      <Col xs={12} sm={3} style={{ paddingBottom: "25px" }}>
        <button
          className="lowerWidth"
          onClick={() => {
            props.setCurrentView("Calorie History");
          }}
        >
          View Calorie History
        </button>
      </Col>
      {!props.profileView ? (
        <Col xs={12} sm={3} style={{ paddingBottom: "25px" }}>
          <button
            className="lowerWidth"
            onClick={() => {
              props.setCurrentView("Goals");
            }}
          >
            View Goals
          </button>
        </Col>
      ) : (
        <Col xs={12} sm={3} style={{ paddingBottom: "25px" }}>
          <button
            className="lowerWidth"
            onClick={() => {
              props.setCurrentView("Gallery");
            }}
          >
            View Gallery
          </button>
        </Col>
      )}

      <Col xs={12} sm={3} style={{ paddingBottom: "25px" }}>
        <button
          className="lowerWidth"
          onClick={() => {
            props.setCurrentView("Training Plans");
          }}
        >
          View Training Plans
        </button>
      </Col>
    </Row>
  );
}

export default ChangeView;
