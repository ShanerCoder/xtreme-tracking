import classes from "./DarkerDiv.module.css";

function DarkerDiv(props) {
  return (
    <div className={classes.darkerDiv}>
      <div className={classes.darkerDivContent}>{props.children}</div>
    </div>
  );
}

export default DarkerDiv;
