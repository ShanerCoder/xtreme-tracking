import DarkerDiv from "../ui/DarkerDiv";
import UpdatePost from "../form-components/UpdatesPage/UpdatePost";
function UpdateHistoryForm(props) {
  const updates = props.updates;
  return (
    <DarkerDiv>
      {props.updates
        .slice(0)
        .reverse()
        .map((update) => (
          <UpdatePost
            key={update.version}
            version={update.version}
            changes={update.changes}
          />
        ))}
    </DarkerDiv>
  );
}

export default UpdateHistoryForm;
