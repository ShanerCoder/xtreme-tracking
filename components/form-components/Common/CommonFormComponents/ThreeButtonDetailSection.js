import classes from "./SingleDetailForm.module.css";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import UserIcon from "../../../ui/UserIcon";
import { useLoadingStore } from "../../../../context/loadingScreen";

function ThreeButtonDetailSection(props) {
  const router = useRouter();
  const [loadingScreen, showLoadingScreen] = useLoadingStore();

  async function handleLoader(URL) {
    showLoadingScreen({ type: true });
    await router.push(URL);
    showLoadingScreen({ type: false });
  }

  return (
    <Row className={classes.detailButtonsSection}>
      <Col className={classes.columnPadding} xs={12} sm={4}>
        <button
          onClick={() => {
            handleLoader(props.viewDetailURL);
          }}
        >
          View {props.detailName}
        </button>
      </Col>
      <Col className={classes.columnPadding} xs={12} sm={4}>
        <button
          onClick={() => {
            handleLoader(props.secondDetailURL);
          }}
        >
          {props.secondDetail}
        </button>
      </Col>
      <Col xs={8} sm={3}>
        <button
          onClick={() => {
            handleLoader("/userProfile/" + props.usernameFrom);
          }}
        >
          View Profile
        </button>
      </Col>
      <Col xs={4} sm={{ span: 1, offset: 0 }}>
        <UserIcon username={props.usernameFrom} />
      </Col>
    </Row>
  );
}

export default ThreeButtonDetailSection;
