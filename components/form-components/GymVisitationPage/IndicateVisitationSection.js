import classes from "./IndicateVisitationSection.module.css";

function IndicateVisitationSection(props) {
  function handleSetVisition() {
    props.handleSetVisition();
  }

  return (
    <>
      <button
        className={"lowerWidth " + classes.buttonText}
        onClick={handleSetVisition}
      >
        Change Visitation Status
      </button>
    </>
  );
}

export default IndicateVisitationSection;
