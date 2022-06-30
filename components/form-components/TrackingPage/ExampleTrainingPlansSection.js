import IndividualTrainingPlan from "./IndividualTrainingPlan";

function ExampleTrainingPlansSection(props) {
  return (
    <>
      {props.trainingPlans && props.trainingPlans.length ? (
        <ul className="list">
          {props.trainingPlans.map((plan) => (
            <IndividualTrainingPlan
              key={plan.id}
              id={plan.id}
              trainingPlanName={plan.trainingPlanName}
              numberOfExercises={plan.numberOfExercises}
            />
          ))}
        </ul>
      ) : (
        <h2 className="center">No Training Plans created</h2>
      )}
    </>
  );
}

export default ExampleTrainingPlansSection;
