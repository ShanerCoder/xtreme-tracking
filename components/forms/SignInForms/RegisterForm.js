import AccountCreationSection from "../../form-components/RegisterPage/AccountCreationSection";

function RegisterForm(props) {
  return <AccountCreationSection onSubmit={props.onAddUser} />;
}

export default RegisterForm;
