import classes from "./ProfileGenerationForm.module.css";

function GenerateProfileForm(props) {
  return (
    <>
      <div className="center">
        <h2>This user's profile failed to create successfully.</h2>
        <h2>
          Please hit the button below in order to generate a profile page for:
          {" " + props.username}.
        </h2>
      </div>

      <div className={classes.generationDiv}>
        <button onClick={props.handleGeneration}>Generate Profile</button>
      </div>
    </>
  );
}

export default GenerateProfileForm;
