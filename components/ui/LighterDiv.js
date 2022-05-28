import classes from "./LighterDiv.module.css";

function LighterDiv(props) {
  return (
    <div className={classes.lighterDiv}>
      <div className={classes.lighterDivContent}>{props.children}</div>
    </div>
  );
}

export default LighterDiv;
