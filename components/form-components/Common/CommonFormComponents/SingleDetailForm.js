import classes from "./SingleDetailForm.module.css";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import UserIcon from "../../../ui/UserIcon";
import Link from "next/link";

function ViewDetailForm(props) {
  const router = useRouter();

  return (
    <li key={props.id} className={classes.detailSection}>
      <h3>
        {props.clientDetailText}
        <Link href={"/userProfile/" + props.usernameFrom}>
          {props.usernameFrom}
        </Link>
      </h3>
      <p>
        {props.dateTimeDetailText}
        {props.dateCreated}
      </p>
      <div className={classes.detailBubble}>
        <Row className={classes.detailButtonsSection}>
          <Col className={classes.columnPadding} xs={12} sm={5}>
            <button
              onClick={() => {
                router.push(props.viewDetailURL);
              }}
            >
              View {props.detailName}
            </button>
          </Col>
          <Col xs={8} sm={5}>
            <button
              onClick={() => {
                router.push("/userProfile/" + props.usernameFrom);
              }}
            >
              View Profile
            </button>
          </Col>
          <Col xs={4} sm={{ span: 1, offset: 1 }}>
            <UserIcon username={props.usernameFrom} />
          </Col>
        </Row>
      </div>
    </li>
  );
}

export default ViewDetailForm;
