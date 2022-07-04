import Head from "next/head";
import SocialForm from "../components/forms/SocialForm";
import Card from "../components/ui/Card";
import LighterDiv from "../components/ui/LighterDiv";
import BannerImage from "../components/ui/BannerImage";
import { useRouter } from "next/router";
import { dbConnect } from "../lib/db-connect";
import Post from "../models/social/post";
import PostLikedBy from "../models/social/postLikedBy";
import PostComment from "../models/social/postComment";
import { useStore } from "../context";
import { getValue } from "../utils/common";
import { getSession } from "next-auth/client";
import { useLoadingStore } from "../context/loadingScreen";

function SocialPage(props) {
  const router = useRouter();
  const [state] = useStore();
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  const user = getValue(state, ["user"], null);

  async function handleNextPageNavigation() {
    showLoadingScreen({ type: true });
    await router.push(
      "/social?pageNumber=" + (Number(props.pageNumber) + Number(1))
    );
    showLoadingScreen({ type: false });
    window.scrollTo({
      bottom: 0,
      behavior: "smooth",
    });
  }

  async function handlePrevPageNavigation() {
    showLoadingScreen({ type: true });
    await router.push(
      "/social?pageNumber=" + (Number(props.pageNumber) - Number(1))
    );
    showLoadingScreen({ type: false });
    window.scrollTo({
      bottom: 0,
      behavior: "smooth",
    });
  }

  async function handleLikePost(postData) {
    const bodyData = {
      postId: postData.postId,
      usernameLikingPost: user.username,
    };

    const requestType = postData.likePost ? "POST" : "DELETE";

    const response = await fetch("/api/social/liked_posts", {
      method: requestType,
      body: JSON.stringify(bodyData),
      headers: { "Content-Type": "application/json" },
    });
    await response.json();
  }

  async function addPostHandler(NewPostData) {
    showLoadingScreen({ type: true });
    const response = await fetch("/api/social/user_posts", {
      method: "POST",
      body: JSON.stringify(NewPostData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await response.json();
    await router.push("/social");
    showLoadingScreen({ type: false });
  }

  return (
    <>
      <Head>
        <title>Social Page</title>
        <meta
          name="Xtreme Tracking Social Page"
          content="Browse the public forum here!"
        />
      </Head>
      <LighterDiv>
        <Card>
          <h1 className="center">Social Page</h1>

          <BannerImage
            className="center"
            imageSource="/socialpage/imageOne.png"
          />
        </Card>
      </LighterDiv>
      {
        <>
          <SocialForm
            userposts={props.userposts}
            article={props.article}
            onAddPost={addPostHandler}
            handleLike={handleLikePost}
            pageNumber={props.pageNumber}
            handleNextPageNavigation={
              props.hasNextPage ? handleNextPageNavigation : null
            }
            handlePrevPageNavigation={
              props.hasPrevPage ? handlePrevPageNavigation : null
            }
            user={user}
            host={props.host}
          />
        </>
      }
    </>
  );
}

export async function getServerSideProps(context) {
  // Connecting to DB and finding posts
  await dbConnect();

  const req = context.req;
  const session = await getSession({ req });

  // PAGINATION INFORMATION
  const pageNumber =
    context.query.pageNumber && context.query.pageNumber > 0
      ? context.query.pageNumber
      : 1;
  const paginateOptions = {
    page: pageNumber,
    limit: 3,
    collation: {
      locale: "en",
    },
    sort: { _id: -1 },
  };
  const userpostList = await Post.paginate({}, paginateOptions);

  const hasNextPage = pageNumber < userpostList.pages;
  const hasPrevPage = pageNumber > 1;
  // END OF PAGINATION INFORMATION

  //const userpostList = await post.find(filter).sort({ _id: -1 }).paginate();
  const arrayOfLikedPostIdsByUser = [];

  const allPostsLiked = await PostLikedBy.find({}).select({
    postId: 1,
    _id: 0,
  });
  const allComments = await PostComment.find({}).select({ postId: 1, _id: 0 });

  // ARTICLE INFORMATION
  const response = await fetch(
    " https://newsdata.io/api/1/news?apikey=pub_8706df797678363bc63e0933e2f89f0ede80&q=exercise&language=en&category=health "
  );
  const articles = await response.json();

  function randomArticle(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  const selectedArticle = randomArticle(articles.results);
  // END OF ARTICLE INFORMATION

  // LIKES AND COMMENTS INFORMATION
  const arrayOfAllLikedPosts = [];
  const arrayOfAllComments = [];

  function handleLikedPostsIds(post) {
    arrayOfAllLikedPosts.push(post.postId.toString());
  }

  function handleCommentPostsIds(post) {
    arrayOfAllComments.push(post.postId.toString());
  }

  allPostsLiked.forEach(handleLikedPostsIds);
  allComments.forEach(handleCommentPostsIds);

  // Counts number of likes for a specific post
  function countLikes(postId) {
    let number = 0;
    for (const num of arrayOfAllLikedPosts) {
      if (num == postId) number++;
    }
    return number;
  }

  // Counts number of comments for a specific post
  function countComments(postId) {
    let number = 0;
    for (const num of arrayOfAllComments) {
      if (num == postId) number++;
    }
    return number;
  }
  // END OF LIKES AND COMMENTS INFROMATION

  if (!session)
    return {
      props: {
        article: selectedArticle ? selectedArticle : null,
        userposts: userpostList.docs.map((post) => ({
          id: post._id.toString(),
          username: post.username,
          postText: post.postText,
          dateAdded: post.createdAt.toString(),
          numberOfLikes: countLikes(post._id.toString()),
          numberOfComments: countComments(post._id.toString()),
        })),
        hasNextPage: hasNextPage,
        hasPrevPage: hasPrevPage,
        pageNumber: pageNumber,
      },
    };

  // POSTS LIKED BY USER INFORMATION
  const postsLiked = await PostLikedBy.find({
    usernameLikingPost: session.user.username,
  }).select({ postId: 1, _id: 0 });

  function handleUserLikedPostIds(post) {
    arrayOfLikedPostIdsByUser.push(post.postId.toString());
  }

  postsLiked.forEach(handleUserLikedPostIds);
  // END OF POSTS LIKED BY USER INFORMATION

  return {
    props: {
      article: selectedArticle ? selectedArticle : null,
      userposts: userpostList.docs.map((post) => ({
        id: post._id.toString(),
        username: post.username,
        postText: post.postText,
        dateAdded: post.createdAt.toString(),
        postLikedByUser: arrayOfLikedPostIdsByUser.includes(
          post._id.toString()
        ),
        numberOfLikes: countLikes(post._id.toString()),
        numberOfComments: countComments(post._id.toString()),
      })),
      hasNextPage: hasNextPage,
      hasPrevPage: hasPrevPage,
      pageNumber: pageNumber,
      host: req.headers.host,
    },
  };
}

export default SocialPage;
