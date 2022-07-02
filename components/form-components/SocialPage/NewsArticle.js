import Card from "../../ui/Card";
import { useRouter } from "next/router";
import classes from "./NewsArticle.module.css";
import { useLoadingStore } from "../../../context/loadingScreen";
import { Col, Row } from "react-bootstrap";

function NewsArticle(props) {
  const router = useRouter();
  const [loadingScreen, showLoadingScreen] = useLoadingStore();

  async function viewArticle() {
    showLoadingScreen({ type: true });
    window.location.href = props.article.link;
    showLoadingScreen({ type: false });
  }

  function shareArticle() {
    const postData = {
      content:
        "Check out this article: " +
        props.article.title +
        "\n\n" +
        props.article.link,
    };
    props.shareArticle(postData);
    window.scrollTo({
      top: 300,
      behavior: "smooth",
    });
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
        <button
          style={{ width: "95%", marginLeft: "2.5%", marginBottom: "20px" }}
          onClick={shareArticle}
        >
          Share This Article
        </button>
      </div>
    </Card>
  );
}

export default NewsArticle;
