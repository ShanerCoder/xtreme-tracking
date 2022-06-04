import { Col, Row } from "react-bootstrap";
import Card from "../../ui/Card";
import Link from "next/link";
import classes from "./viewSelectedChallenge.module.css";

function ViewSelectedChallengeForm(props) {
  return (
    <Card>
      <Row className={classes.row}>
        <Col xs={6} lg={4}>
          <label>Exercise: </label>
        </Col>
        <Col xs={6} lg={4} className={classes.columnPadding}>
          <Link href={props.exerciseName}>{props.exerciseName}</Link>
        </Col>
      </Row>
    </Card>
  );
}

export default ViewSelectedChallengeForm;
