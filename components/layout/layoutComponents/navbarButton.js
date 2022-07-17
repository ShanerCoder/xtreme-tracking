import { Col, Row } from "react-bootstrap";
import classes from "./navbarButton.module.css";
function NavbarButton(props) {
  return (
    <div
      className={classes.link}
      onClick={() => {
        props.handleLoader(props.link);
      }}
    >
      <Row>
        <Col xs={3} lg={3}>
          <img className={classes.icon} src={props.imgsrc} alt="Button Image" />
        </Col>
        <Col xs={9} lg={{ span: 6, offset: 1 }}>
          <p className={classes.text}>{props.text}</p>
        </Col>
      </Row>
    </div>
  );
}

export default NavbarButton;
