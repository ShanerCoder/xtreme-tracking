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
            date={update.date}
            changes={update.changes}
            hotfixes={update.hotfixes}
          />
        ))}
    </DarkerDiv>
  );
}

export default UpdateHistoryForm;
