import classes from "./ViewMessagesForm.module.css";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";

function ViewMessagesForm(props) {
  const router = useRouter();

  function viewButtonHandler(URL) {
    router.push(URL);
  }

  return (
    <>
      <ul className={classes.list}>
        {props.privateMessages.map((message) => (
          <li key={message.id} className={classes.messageSection}>
            <p>
              {message.usernameFrom} - {message.dateCreated}
            </p>
            <div className={classes.messageBubble}>
              <Row className={classes.messageButtonsSection}>
                <Col>
                  <button
                    onClick={() => {
                      viewButtonHandler("/viewMessages/" + message.id);
                    }}
                  >
                    View Message
                  </button>
                </Col>
                <Col>
                  <button
                    onClick={() => {
                      viewButtonHandler("/userProfile/" + message.usernameFrom);
                    }}
                  >
                    View Sender Profile
                  </button>
                </Col>
              </Row>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ViewMessagesForm;
