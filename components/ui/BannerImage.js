import classes from "./BannerImage.module.css";

function BannerImage(props) {
  return (
    <div className={classes.bannerImageDiv}>
      <img
        className={classes.bannerImage}
        src={props.imageSource}
        alt="Banner Image"
      />
    </div>
  );
}

export default BannerImage;
