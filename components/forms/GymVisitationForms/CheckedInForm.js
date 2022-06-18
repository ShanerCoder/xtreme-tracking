import { Image } from "cloudinary-react";
import classes from "./GymVisitationForms.module.css";

function CheckedInView(props) {
  return (
    <>
      <h2 className="center">Checked In this day</h2>
      {props.photoId && (
        <Image
          className={classes.checkInPhoto}
          cloudName="multishane999"
          publicId={props.photoId}
        />
      )}
    </>
  );
}

export default CheckedInView;
