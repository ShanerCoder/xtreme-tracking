import classes from "./SingleDetailForm.module.css";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import UserIcon from "../../../ui/UserIcon";

function ViewMessagesForm(props) {
  const router = useRouter();

  return (
    <li key={props.id} className={classes.messageSection}>
      <p>
        {props.usernameFrom} - {props.dateCreated}
      </p>
      <div className={classes.messageBubble}>
        <Row className={classes.messageButtonsSection}>
          <Col className={classes.columnPadding} xs={12} sm={5}> 
            <button
              onClick={() => {
                router.push(props.viewMessageURL);
              }}
            >
              View {props.detailName}
            </button>
          </Col>
          <Col xs={8} sm={5}>
            <button
              onClick={() => {
                router.push("/userProfile/" + props.usernameFrom);
              }}
            >
              View Sender Profile
            </button>
          </Col>
          <Col xs={4} sm={{span: 1, offset: 1}}>
            <UserIcon username={props.usernameFrom} />
          </Col>
        </Row>
      </div>
    </li>
  );
}

export default ViewMessagesForm;
