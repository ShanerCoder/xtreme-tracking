import classes from "./ViewIncomingDetailsForm.module.css";
import SingleDetailForm from "./CommonFormComponents/SingleDetailForm";

function ViewMessagesForm(props) {
  return (
    <>
      <ul className={classes.list}>
        {props.incomingDetails.map((detail) => (
          <SingleDetailForm
            key={detail.id}
            id={detail.id}
            usernameFrom={detail.usernameFrom}
            dateCreated={detail.dateCreated}
            viewMessageURL={props.viewMessageURL + detail.id}
          />
        ))}
      </ul>
    </>
  );
}

export default ViewMessagesForm;
