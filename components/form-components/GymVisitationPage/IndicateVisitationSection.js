function IndicateVisitationSection(props) {
  function handleSetVisition() {
    props.handleSetVisition();
  }

  return (
    <>
      <button
        className={"lowerWidth bigButtonText"}
        onClick={handleSetVisition}
      >
        Change Visitation Status
      </button>
    </>
  );
}

export default IndicateVisitationSection;
