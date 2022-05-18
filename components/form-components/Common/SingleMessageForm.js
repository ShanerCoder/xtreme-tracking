import LighterDiv from "../../ui/LighterDiv";
import Card from "../../ui/Card";
import classes from "./SingleMessageForm.module.css";
import { useRef } from "react";
function MessageForm(props) {
  const messageRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    props.submitHandler(messageRef.current.value);
    messageRef.current.value = null;
  }

  return (
    <LighterDiv>
      <h1 className="center">{props.messageTitle}</h1>
      <p>{props.messageSubject}</p>
      <Card>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.control}>
            <textarea
              rows="5"
              required
              id="message"
              placeholder="Message"
              maxLength="400"
              ref={messageRef}
            />
          </div>
          <div className={classes.actions}>
            <button>{props.buttonMessage}</button>
          </div>
        </form>
      </Card>
    </LighterDiv>
  );
}

export default MessageForm;
