import AccountLoginSection from "../../form-components/LoginPage/AccountLoginSection";

function LoginForm(props) {
  return <AccountLoginSection onSubmit={props.authenticateUser} />;
}

export default LoginForm;
