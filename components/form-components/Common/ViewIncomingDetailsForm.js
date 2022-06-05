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
            secondDetail={props.secondDetail}
            secondDetailURL={props.secondDetailURL + detail.id}
            clientDetailText={props.clientDetailText}
            dateTimeDetailText={props.dateTimeDetailText}
            exerciseName={detail.exerciseName}
            dateToAchieveBy={detail.dateToAchieveBy}
          />
        ))}
      </ul>
    </>
  );
}

export default ViewIncomingDetailsForm;
