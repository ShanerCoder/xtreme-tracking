import { Col, Row } from "react-bootstrap";
import ChangeForm from "../../form-components/ProfilePage/ChangeForm";

function ForgotPasswordForm(props) {
  return (
    <>
      <h1 className="center">Account Settings</h1>
      <Row>
        <Col sm={6}>
          <ChangeForm
            newValueType="Password"
            onSubmit={props.savePassword}
          />
        </Col>
        <Col sm={6}>
          <ChangeForm
            newValueType="Email"
            onSubmit={props.saveEmail}
          />
        </Col>
      </Row>
    </>
  );
}

export default ForgotPasswordForm;
