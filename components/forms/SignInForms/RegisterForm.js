import { Col, Row } from "react-bootstrap";
import AccountCreationSection from "../../form-components/RegisterPage/AccountCreationSection";
import classes from "./RegisterForm.module.css";

function RegisterForm(props) {
  return (
    <>
      <Row className={classes.rowFormatting}>
        <Col xs={12} lg={6} className={classes.joinTheClubColumn}>
          <Row>
            <p className={`${classes.whiteText} ${classes.headerText}`}>
              Join The Club
            </p>
            <p className={classes.whiteText}>
              The best tracking and socialising exercise website
            </p>
          </Row>
          <Row>
            <img
              className={classes.imageOne}
              src="/registerPage/imageOne.png"
            />
          </Row>
        </Col>
        <Col xs={12} lg={6} className={classes.registerColumn}>
          <AccountCreationSection onSubmit={props.onAddUser} />
        </Col>
      </Row>
    </>
  );
}

export default RegisterForm;
