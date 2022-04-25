import SocialForm from "../components/forms/SocialForm";
import Card from "../components/ui/Card";
import LighterDiv from "../components/ui/LighterDiv";
import classes from "./PageStyling.module.css";
import BannerImage from "../components/ui/BannerImage";

function SocialPage() {
  return (
    <section>
      <LighterDiv>
        <Card>
          <h2 className={classes.center}>Social Page</h2>
          <BannerImage
            className={classes.center}
            imageSource="/socialpage/BannerImage.png"
          />
        </Card>
      </LighterDiv>
      <SocialForm />
    </section>
  );
}

export default SocialPage;
