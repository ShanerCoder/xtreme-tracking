import classes from "./AdditionalSetting.module.css";

function AdditionalSetting(props) {
  let checkBoxValue = props.defaultChecked;

  function handleSubmit() {
    if (checkBoxValue != props.defaultChecked) {
      props.handleSubmit(checkBoxValue);
    }
  }

  return (
    <div className={classes.divFormatting + " lowerWidth"}>
      <h3 className={classes.headerFormatting}>
        {props.label}
        <input
          id="checkBox"
          className={classes.additionalProfileSettingsInput}
          type="checkbox"
          defaultChecked={props.defaultChecked}
          onChange={() => {
            checkBoxValue = !checkBoxValue;
          }}
        />
      </h3>
      <button
        className={classes.additionalSettingButton + " lowerWidth"}
        onClick={handleSubmit}
      >
        {props.buttonLabel}
      </button>
    </div>
  );
}

export default AdditionalSetting;
