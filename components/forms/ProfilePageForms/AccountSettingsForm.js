import { Col, Row } from "react-bootstrap";
import ChangeForm from "../../form-components/ProfilePage/ChangeForm";

function ForgotPasswordForm(props) {
  return (
    <>
      <h1 className="center">Account Settings</h1>
      <Row>
        <Col xs={6}>
          <ChangeForm
            newValueType="Password"
            handleSubmit={props.savePassword}
          />
        </Col>
        <Col xs={6}>
          <ChangeForm newValueType="Email" handleSubmit={props.saveEmail} />
        </Col>
      </Row>
    </>
  );
}

export default ForgotPasswordForm;
