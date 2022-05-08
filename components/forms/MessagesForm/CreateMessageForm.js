import LighterDiv from "../../ui/LighterDiv";
import Card from "../../ui/Card";
import classes from "./CreateMessageForm.module.css";
import { useRef } from "react";
function MessageForm(props) {
  const messageRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    props.submitHandler(messageRef.current.value);
  }

  return (
    <LighterDiv>
      <Card>
        <form className={classes.form} onSubmit={handleSubmit}>
          <h2 className="center">{props.messageTitle}</h2>
          <div className={classes.control}>
            <label htmlFor="title">{props.messageSubject}</label>
            <textarea
              rows="5"
              required
              id="title"
              placeholder="Message"
              maxLength="400"
              ref={messageRef}
            />
          </div>
          <div className={classes.actions}>
            <button>Send your Message</button>
          </div>
        </form>
      </Card>
    </LighterDiv>
  );
}

export default MessageForm;
