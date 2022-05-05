import Card from "../../ui/Card";
import classes from "./UpdatePost.module.css";

function UpdatePost(props) {
  const changes = props.changes;
  return (
    <>
      <h2>Version: {props.version}</h2>
      <Card>
        {props.changes.map((change) => (
          <p key={change.change} className={classes.updatePostText}>
            - {change.change}
          </p>
        ))}
      </Card>
    </>
  );
}

export default UpdatePost;
