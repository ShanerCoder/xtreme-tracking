import { Row } from "react-bootstrap";
import { Image } from "cloudinary-react";
import classes from "./ProfileImageAndName.module.css"

function ProfileImageAndName(props) {
  return (
    <>
      <Row>
        <Image
          className={classes.profilePicture}
          cloudName="multishane999"
          publicId={props.pictureId}
        />
      </Row>
      <Row>
        <h3 className="center">
          {props.forename} {props.surname}
        </h3>
      </Row>
    </>
  );
}

export default ProfileImageAndName;
