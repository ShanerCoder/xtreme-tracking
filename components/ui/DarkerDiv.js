import classes from "./DarkerDiv.module.css";

function DarkerDiv(props) {
  return <div className={classes.darkerDiv}>{props.children}</div>;
}

export default DarkerDiv;
