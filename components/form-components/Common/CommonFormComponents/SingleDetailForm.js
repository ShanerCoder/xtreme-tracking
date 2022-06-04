import classes from "./SingleDetailForm.module.css";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import UserIcon from "../../../ui/UserIcon";
import Link from "next/link";
import TwoButtonDetailSection from "./TwoButtonDetailSection";
import ThreeButtonDetailSection from "./ThreeButtonDetailSection";

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
