import Card from "../../ui/Card";
import { useRouter } from "next/router";
import classes from "./NewsArticle.module.css";
import { useLoadingStore } from "../../../context/loadingScreen";

function NewsArticle(props) {
  const router = useRouter();
  const [loadingScreen, showLoadingScreen] = useLoadingStore();

  async function viewArticle() {
    showLoadingScreen({ type: true });
    window.location.href = props.article.link;
    showLoadingScreen({ type: false });
  }

  return (
    <Card>
      <div className={classes.divFormatting + " lowerWidth"}>
        {props.article.image_url && (
          <div>
            <img
              className={classes.imageFormatting}
              src={props.article.image_url}
              onClick={viewArticle}
            />
          </div>
        )}
        <div>
          <label className={classes.titleFormatting} onClick={viewArticle}>
            {props.article.title}
          </label>
        </div>
        {!props.article.image_url && (
          <div>
            <label
              className={classes.descriptionFormatting}
              onClick={viewArticle}
            >
              {props.article.description}
            </label>
          </div>
        )}
        <div>
          <label className={classes.dateTimeFormatting} onClick={viewArticle}>
            {props.article.pubDate}
          </label>
        </div>
      </div>
    </Card>
  );
}

export default NewsArticle;
