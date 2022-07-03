import { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import ForgotPasswordSection from "../../../form-components/ForgotPasswordPage/ForgotPasswordSection";
import classes from "./ForgotPasswordForm.module.css";

function ForgotPasswordForm(props) {
  const emailInputRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const emailValue = emailInputRef.current.value;
    props.onSubmit(emailValue);
  }

  return (
    <Row className={classes.rowFormatting}>
      <Col xs={12} lg={6} className={classes.rejoinTheClubColumn}>
        <Row>
          <p className={`${classes.whiteText} ${classes.headerText}`}>
            Re-Join The Club
          </p>
          <p className={classes.whiteText}>
            Write in your Email and get back on Track!
          </p>
        </Row>
        <Row>
          <img
            className={classes.imageOne}
            src="/forgotPasswordPage/imageOne.png"
          />
        </Row>
      </Col>
      <Col xs={12} lg={6} className={classes.forgotPasswordColumn}>
        <ForgotPasswordSection onSubmit={props.onSubmit} />
      </Col>
    </Row>
  );
}

export default ForgotPasswordForm;
