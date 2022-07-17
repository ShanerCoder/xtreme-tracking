import Card from "../../../ui/Card";
import { useRef } from "react";
import classes from "./ResetPasswordForm.module.css";
import { Col, Row } from "react-bootstrap";
import ResetPasswordSection from "../../../form-components/ResetPasswordPage/ResetPasswordSection";

function ResetPasswordForm(props) {
  return (
    <Row className={classes.rowFormatting}>
      <Col xs={12} lg={6} className={classes.joinTheClubColumn}>
        <Row>
          <p className={`${classes.whiteText} ${classes.headerText}`}>
            Re-Join The Club
          </p>
          <p className={classes.whiteText}>
            Enter and confirm your new Password, and get on Track!
          </p>
        </Row>
        <Row>
          <img
            className={classes.imageOne}
            src="/forgotPasswordPage/imageOne.png"
            alt="Image One"
          />
        </Row>
      </Col>
      <Col xs={12} lg={6} className={classes.forgotPasswordColumn}>
        <ResetPasswordSection
          onSubmit={props.onSubmit}
          setErrorMessage={props.setErrorMessage}
        />
      </Col>
    </Row>
  );
}

export default ResetPasswordForm;
