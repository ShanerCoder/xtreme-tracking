import { Col, Row } from "react-bootstrap";
import classes from "./HomeForm.module.css";
import LighterDiv from "../ui/LighterDiv";
import DarkerDiv from "../ui/DarkerDiv";
import { useRouter } from "next/router";
import { useLoadingStore } from "../../context/loadingScreen";

function HomeForm() {
  const router = useRouter();
  const [loadingScreen, showLoadingScreen] = useLoadingStore();

  async function handleLoader(URL) {
    showLoadingScreen({ type: true });
    await router.push(URL);
    showLoadingScreen({ type: false });
  }

  function firstBlockOfText() {
    return (
      <>
        <p className={classes.headerText}>The start of your</p>
        <p className={classes.headerText}>Progression.</p>
        <p>You can now track your exercises</p>
        <p>on Xtreme Tracking!</p>
        <button
          className={classes.buttonFormatting}
          onClick={() => {
            handleLoader("/tracking");
          }}
        >
          TRACK NOW
        </button>
      </>
    );
  }

  function secondBlockOfText() {
    return (
      <>
        <p className={classes.headerText}>Step up your game.</p>
        <p>Reach out to Personal Trainers for online consultations</p>
        <button
          className={classes.buttonFormatting}
          onClick={() => {
            handleLoader("/userProfile/settings");
          }}
        >
          SET UP YOUR PROFILE
        </button>
      </>
    );
  }

  function thirdBlockOfText() {
    return (
      <>
        <p className={classes.headerText}>It's a journey.</p>
        <p className={classes.headerText}>You don't have to travel it alone.</p>
        <p>Reach out to others on the same path</p>
        <button
          className={classes.buttonFormatting}
          onClick={() => {
            handleLoader("/social");
          }}
        >
          SOCIAL PAGE
        </button>
      </>
    );
  }

  return (
    <>
      <div className="d-none d-lg-block">
        <img
          src="/homepage/imageOne.png"
          alt="Image One"
          className={classes.imageOne}
        ></img>
        <div className={`${classes.imageOneText} ${classes.whiteText}`}>
          {firstBlockOfText()}
        </div>
      </div>
      <div className="d-block d-lg-none">
        <LighterDiv>{firstBlockOfText()}</LighterDiv>
      </div>

      <div className="d-none d-lg-block">
        <Row className={classes.rowFormatting}>
          <Col lg={6}>
            <img
              src="/homepage/imageTwo.png"
              alt="Image Two"
              className={classes.imageTwo}
            ></img>
          </Col>
          <Col lg={6}>
            <div className={`${classes.imageTwoText} ${classes.blacktext}`}>
              {secondBlockOfText()}
            </div>
          </Col>
        </Row>
      </div>
      <div className="d-block d-lg-none">
        <DarkerDiv>{secondBlockOfText()}</DarkerDiv>
      </div>

      <div className="d-none d-lg-block">
        <Row className={classes.rowFormatting}>
          <Col lg={6}>
            <div className={`${classes.imageThreeText} ${classes.blacktext}`}>
              {thirdBlockOfText()}
            </div>
          </Col>
          <Col lg={6}>
            <img
              src="/homepage/imageThree.png"
              alt="Image Three"
              className={classes.imageThree}
            ></img>
          </Col>
        </Row>
      </div>
      <div className="d-block d-lg-none">
        <LighterDiv>{thirdBlockOfText()}</LighterDiv>
      </div>
    </>
  );
}

export default HomeForm;
