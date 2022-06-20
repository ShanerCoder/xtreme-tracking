import { useRef, useState } from "react";
import classes from "./AddNewPhoto.module.css";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function AddNewPhoto(props) {
  const [uploadData, setUploadData] = useState(null);
  const photoDescriptionRef = useRef();
  const privatePhotoRef = useRef();
  const [errorMessage, setErrorMessage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  function handleAddPhoto(event) {
    event.preventDefault();
    if (uploadData) {
      if (props.photoDescription && props.privatePublicToggle) {
        const postData = {
          uploadData: uploadData,
          photoDescription: photoDescriptionRef.current.value,
          privatePhoto: privatePhotoRef.current.checked,
        };
        props.handleAddPhoto(postData);
      } else {
        props.handleAddPhoto(uploadData);
      }
      setUploadData(null);
      setImageSrc(null);
      photoDescriptionRef.current.value = null;
      setErrorMessage(null);
    } else setErrorMessage("No image has been selected!");
  }

  return (
    <Form onSubmit={handleAddPhoto}>
      <h4 className="center" style={{ paddingTop: "15px" }}>
        {props.title}
      </h4>
      {!imageSrc ? (
        <img src={null} className={classes.emptyPhoto} />
      ) : (
        <img src={imageSrc} className={classes.filledInPhoto} />
      )}
      <div className="center">
        <input
          className={classes.addFileUpload}
          type="file"
          onChange={(event) => {
            setImageSrc(URL.createObjectURL(event.target.files[0]));
            setUploadData(event.target.files);
          }}
        />
      </div>
      {props.privatePublicToggle && (
        <div>
          <Row style={{ textAlign: "center" }}>
            <Col xs={6} lg={{ span: 3, offset: 3 }}>
              <Form.Check
                inline
                label="Public Photo"
                name="group1"
                type="radio"
                id={`inline-radio-1`}
                defaultChecked={true}
                required
                className={classes.radioButtonFormatting}
              />
            </Col>
            <Col xs={6} lg={3}>
              <Form.Check
                inline
                label="Private Photo"
                name="group1"
                type="radio"
                id={`inline-radio-2`}
                ref={privatePhotoRef}
                required
                className={classes.radioButtonFormatting}
              />
            </Col>
          </Row>
        </div>
      )}
      {props.photoDescription && (
        <div className="control">
          <label htmlFor={"photoDescription"}>{props.photoDescription}</label>
          <textarea
            id="photoDescription"
            required
            rows="5"
            maxLength={400}
            ref={photoDescriptionRef}
          />
        </div>
      )}
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      <button className={"lowerWidth bigButtonText"}>{props.buttonText}</button>
    </Form>
  );
}

export default AddNewPhoto;
