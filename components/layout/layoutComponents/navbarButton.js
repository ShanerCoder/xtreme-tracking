import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import classes from "./navbarButton.module.css";

function NavbarButton(props) {
  return (
    <Link href={props.link}>
      <div className={classes.link}>
        <Row>
          <Col xs={3} lg={3}>
            <img className={classes.icon} src={props.imgsrc} />
          </Col>
          <Col xs={9} lg={{ span: 6, offset: 1 }}>
            <p className={classes.text}>{props.text}</p>
          </Col>
        </Row>
      </div>
    </Link>
  );
}

export default NavbarButton;
