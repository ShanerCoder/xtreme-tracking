import classes from "./SingleDetailForm.module.css";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";

function ViewMessagesForm(props) {
  const router = useRouter();

  return (
    <li key={props.id} className={classes.messageSection}>
      <p>
        {props.usernameFrom} - {props.dateCreated}
      </p>
      <div className={classes.messageBubble}>
        <Row className={classes.messageButtonsSection}>
          <Col>
            <button
              onClick={() => {
                router.push(props.viewMessageURL);
              }}
            >
              View Message
            </button>
          </Col>
          <Col>
            <button
              onClick={() => {
                router.push("/userProfile/" + props.usernameFrom);
              }}
            >
              View Sender Profile
            </button>
          </Col>
        </Row>
      </div>
    </li>
  );
}

export default ViewMessagesForm;
