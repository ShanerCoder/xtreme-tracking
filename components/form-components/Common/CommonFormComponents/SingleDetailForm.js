import classes from "./SingleDetailForm.module.css";
import { useRouter } from "next/router";
import TwoButtonDetailSection from "./TwoButtonDetailSection";
import ThreeButtonDetailSection from "./ThreeButtonDetailSection";
import { useLoadingStore } from "../../../../context/loadingScreen";

function ViewDetailForm(props) {
  const router = useRouter();
  const [loadingScreen, showLoadingScreen] = useLoadingStore();

  // Redirect Function
  async function handleLoader(URL) {
    showLoadingScreen({ type: true });
    await router.push(URL);
    showLoadingScreen({ type: false });
  }

  return (
    <li key={props.id} className={classes.detailSection}>
      <h3>
        {props.clientDetailText}
        <label
          className="linkLabel"
          onClick={() => {
            handleLoader("/userProfile/" + props.usernameFrom);
          }}
        >
          {props.usernameFrom}
        </label>
      </h3>
      {props.exerciseName && <h4>Exercise: {props.exerciseName}</h4>}
      {props.dateToAchieveBy && (
        <h4>
          Date to Achieve By: {new Date(props.dateToAchieveBy).toDateString()}
        </h4>
      )}
      <p>
        {props.dateTimeDetailText}
        {props.dateCreated}
      </p>
      <div className={classes.detailBubble}>
        {props.secondDetail ? (
          <ThreeButtonDetailSection
            detailName={props.detailName}
            viewDetailURL={props.viewDetailURL}
            secondDetail={props.secondDetail}
            secondDetailURL={props.secondDetailURL}
            usernameFrom={props.usernameFrom}
          />
        ) : (
          <TwoButtonDetailSection
            detailName={props.detailName}
            viewDetailURL={props.viewDetailURL}
            usernameFrom={props.usernameFrom}
          />
        )}
      </div>
    </li>
  );
}

export default ViewDetailForm;
