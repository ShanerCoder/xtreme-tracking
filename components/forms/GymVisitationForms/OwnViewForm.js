import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import classes from "./GymVisitationForms.module.css";
import { Image } from "cloudinary-react";

function OwnViewForm(props) {
  const [imageSrc, setImageSrc] = useState(null);
  const [uploadData, setUploadData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  function handleCheckIn() {
    if (uploadData) {
      props.handleCheckIn(uploadData);
      setUploadData(null);
      setImageSrc(null);
      setErrorMessage(null);
    } else setErrorMessage("No image has been selected!");
  }

  // boolean for isToday can be enabled to only allow for the current day to be checked in
  //const isToday = new Date().toDateString() == props.selectedDate;
  return (
    <>
      {
        //isToday &&
        !props.checkedIn && (
          <>
            <h4 className="center" style={{ paddingTop: "15px" }}>
              Add a photo for today
            </h4>
            {!imageSrc ? (
              <img src={null} className={classes.emptyPhoto} />
            ) : (
              <img src={imageSrc} className={classes.checkInPhoto} />
            )}
            <div className="center">
              <input
                className={classes.checkInFileUpload}
                type="file"
                onChange={(event) => {
                  setImageSrc(URL.createObjectURL(event.target.files[0]));
                  setUploadData(event.target.files);
                }}
              />
            </div>
            {errorMessage && <p className="errorMessage">{errorMessage}</p>}
            <button className="lowerWidth" onClick={handleCheckIn}>
              Check In
            </button>
          </>
        )
      }
    </>
  );
}

export default OwnViewForm;
