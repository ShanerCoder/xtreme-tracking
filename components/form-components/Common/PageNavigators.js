import { Col, Row } from "react-bootstrap";
import classes from "./PageNavigators.module.css";

function PageNavigators(props) {
  return (
    <Row>
      <Col xs={2} lg={{ span: 2, offset: 3 }}>
        {props.handlePrevPageNavigation && (
          <div className={"col col-start " + classes.pageNavigatorIconsDivs}>
            <div
              className={"icon " + classes.pageNavigatorIcons}
              onClick={props.handlePrevPageNavigation}
            >
              chevron_left
            </div>
          </div>
        )}
      </Col>
      <Col xs={8} lg={2}>
        <h4 className="center">Current Page Number: {props.pageNumber}</h4>
      </Col>
      <Col xs={2} lg={2}>
        {props.handleNextPageNavigation && (
          <div
            className={"col col-end " + classes.pageNavigatorIconsDivs}
            onClick={props.handleNextPageNavigation}
          >
            <div className={"icon " + classes.pageNavigatorIcons}>
              chevron_right
            </div>
          </div>
        )}
      </Col>
    </Row>
  );
}

export default PageNavigators;
