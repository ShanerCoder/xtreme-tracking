import { Col, Row } from "react-bootstrap";

function ChangeView(props) {
  const spacing = props.profileView ? 6 : 4;
  return (
    <Row>
      <Col xs={12} sm={spacing} style={{ paddingBottom: "25px" }}>
        <button
          className="lowerWidth"
          onClick={() => {
            props.setCurrentView("Exercise History");
          }}
        >
          View Exercise History
        </button>
      </Col>
      {!props.profileView && (
        <Col xs={12} sm={4} style={{ paddingBottom: "25px" }}>
          <button
            className="lowerWidth"
            onClick={() => {
              props.setCurrentView("Goals");
            }}
          >
            View Goals
          </button>
        </Col>
      )}

      <Col xs={12} sm={spacing} style={{ paddingBottom: "25px" }}>
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
