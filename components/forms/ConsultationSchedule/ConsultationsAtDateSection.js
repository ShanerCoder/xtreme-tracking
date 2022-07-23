import ConsultationDetails from "./ConsultationDetails";

function ConsultationsAtDateSection(props) {
  // Variable that is shown if there are no consultations for the selected day
  let noConsultations = (
    <h3 className="center">No Consultations for this Day</h3>
  );
  return (
    <>
      <ul className="list">
        {props.consultations.map((consultation) => (
          <div key={consultation.id}>
            {new Date(consultation.datetimeOfConsultation).toDateString() ==
              props.selectedDate && (
              <>
                {(noConsultations = null)}
                <ConsultationDetails
                  key={consultation.id}
                  removeConsultation={props.removeConsultation}
                  id={consultation.id}
                  clientUsername={consultation.clientUsername}
                  datetimeOfConsultation={consultation.datetimeOfConsultation}
                />
              </>
            )}
          </div>
        ))}
      </ul>
      {noConsultations || (
        <h3 className="center">No More Consultations for this Day</h3>
      )}
    </>
  );
}

export default ConsultationsAtDateSection;
