import classes from "./LighterDiv.module.css";

function LighterDiv(props) {
  return <div className={classes.lighterDiv}>{props.children}</div>;
}

export default LighterDiv;
