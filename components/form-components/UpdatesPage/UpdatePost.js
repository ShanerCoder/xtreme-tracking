import { Fragment } from "react";
import Card from "../../ui/Card";
import classes from "./UpdatePost.module.css";

function UpdatePost(props) {
  const hotfixes = props.hotfixes;
  return (
    <div className={classes.postSpacing}>
      <h2>
        Version: {props.version} - {props.date}
      </h2>
      <Card>
        {props.changes.map((change) => (
          <p key={change.change} className={classes.updatePostText}>
            - {change.change}
          </p>
        ))}
      </Card>

      {hotfixes ? (
        <>
          <h3>Hotfixes:</h3>
          {props.hotfixes.map((hotfix) => (
            <div key={hotfix.version} className={classes.hotfixSpacing}>
              <h3>
                Version: {hotfix.version} - {hotfix.date}
              </h3>
              <Card>
                {hotfix.changes.map((change) => (
                  <p key={change.change} className={classes.updatePostText}>
                    - {change.change}
                  </p>
                ))}
              </Card>
            </div>
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default UpdatePost;
