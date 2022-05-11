import DarkerDiv from "../ui/DarkerDiv";
import LighterDiv from "../ui/LighterDiv";
import Card from "../ui/Card";
import classes from "./ProfileForm.module.css";
import { Col, Row } from "react-bootstrap";
import { useStore } from "../../context";
import { getValue } from "../../utils/common";
import { useRouter } from "next/router";

function ForgotPasswordForm(props) {
  const router = useRouter();
  const [state] = useStore();
  const user = getValue(state, ["user"], null);
  let ownProfilePage = user.id == props.id;

  function handlePrivateMessage() {
    router.push("/userProfile/privateMessage/" + props.username);
  }

  return (
    <>
      <h1>Test</h1>
    </>
  );
}

export default ForgotPasswordForm;
