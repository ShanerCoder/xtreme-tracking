import { Col, Row } from "react-bootstrap";
import AccountLoginSection from "../../form-components/LoginPage/AccountLoginSection";
import classes from "./LoginForm.module.css";

function LoginForm(props) {
  return (
    <>
      <Row className={classes.rowFormatting}>
        <Col xs={12} lg={6} className={classes.welcomeBackColumn}>
          <Row>
            <p className={`${classes.whiteText} ${classes.headerText}`}>
              Welcome Back!
            </p>
            <p className={classes.whiteText}>
              Continue your tracking progress by logging in
            </p>
          </Row>
          <Row>
            <img className={classes.imageOne} src="/loginPage/imageOne.png" />
          </Row>
        </Col>
        <Col xs={12} lg={6} className={classes.loginColumn}>
          <AccountLoginSection onSubmit={props.authenticateUser} />
        </Col>
      </Row>
    </>
  );
}

export default LoginForm;
