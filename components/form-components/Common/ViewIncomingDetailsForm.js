import classes from "./ViewIncomingDetailsForm.module.css";
import SingleDetailForm from "./CommonFormComponents/SingleDetailForm";

function ViewIncomingDetailsForm(props) {
  return (
    <>
      <ul className="list">
        {props.incomingDetails.map((detail) => (
          <SingleDetailForm
            key={detail.id}
            id={detail.id}
            usernameFrom={detail.usernameFrom}
            dateCreated={detail.dateCreated}
            viewDetailURL={props.viewDetailURL + detail.id}
            detailName={props.detailName}
            clientDetailText={props.clientDetailText}
            dateTimeDetailText={props.dateTimeDetailText}
          />
        ))}
      </ul>
    </>
  );
}

export default ViewIncomingDetailsForm;
