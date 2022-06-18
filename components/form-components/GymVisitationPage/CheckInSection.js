import { useState } from "react";
import classes from "./CheckInSection.module.css"

function CheckInSection(props) {

  const [uploadData, setUploadData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  function handleCheckIn() {
    if (uploadData) {
      props.handleCheckIn(uploadData);
      setUploadData(null);
      setImageSrc(null);
      setErrorMessage(null);
    } else setErrorMessage("No image has been selected!");
  }

  return (
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
      <button className={"lowerWidth " + classes.buttonText} onClick={handleCheckIn}>
        Check In
      </button>
    </>
  );
}

export default CheckInSection;
