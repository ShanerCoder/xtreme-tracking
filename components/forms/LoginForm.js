import { useRef } from "react";
import Card from "../ui/Card";
import classes from "./LoginForm.module.css";
import AccountLoginSection from "../form-components/LoginPage/AccountLoginSection";

function LoginForm(props) {

  return <AccountLoginSection onSubmit={props.authenticateUser}/>;
}

export default LoginForm;
