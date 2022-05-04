import Card from "../components/ui/Card";
import LighterDiv from "../components/ui/LighterDiv";
import classes from "./PageStyling.module.css";
import BannerImage from "../components/ui/BannerImage";
import UpdateHistoryForm from "../components/forms/UpdateHistoryForm";

function UpdateHistoryPage() {
  const data = [
    {
      version: 0.1,
      changes: [
        { change: "Social Page Added" },
        { change: "Navigation Page Added" },
      ],
    },
    {
      version: 0.2,
      changes: [
        { change: "Account Registration Added" },
        { change: "Account Login Added" },
        { change: "Update History Page Added" },
      ],
    },
  ];

  return (
    <section>
      <LighterDiv>
        <Card>
          <h2 className={classes.center}>Update History</h2>
          <BannerImage
            className={classes.center}
            imageSource="/socialpage/BannerImage.png"
          />
        </Card>
      </LighterDiv>
      <UpdateHistoryForm updates={data} />
    </section>
  );
}

export default UpdateHistoryPage;
