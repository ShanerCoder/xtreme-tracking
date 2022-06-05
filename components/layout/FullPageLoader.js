import classes from "./FullPageLoader.module.css";

const FullPageLoader = (props) => {
  return (
    <div className={classes.fp_container}>
      <img src="/images/LoadingRing.gif" className={classes.fp_loader} alt="Loading Page" />
    </div>
  );
};

export default FullPageLoader;
