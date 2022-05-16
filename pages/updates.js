import Head from "next/head";
import Card from "../components/ui/Card";
import LighterDiv from "../components/ui/LighterDiv";
import BannerImage from "../components/ui/BannerImage";
import UpdateHistoryForm from "../components/forms/UpdateHistoryForm";
import updateHistory from "../components/assets/updateHistory.json";

function UpdateHistoryPage() {
  const history = updateHistory;

  return (
    <>
      <Head>
        <title>Updates</title>
        <meta
          name="Xtreme Tracking Update History Page"
          content="Browse Xtreme Tracking's Update History here!"
        />
      </Head>
      <section>
        <LighterDiv>
          <Card>
            <h2 className="center">Update History</h2>
            <BannerImage imageSource="/socialpage/BannerImage.png" />
          </Card>
        </LighterDiv>
        <UpdateHistoryForm updates={history} />
      </section>
    </>
  );
}

export default UpdateHistoryPage;
