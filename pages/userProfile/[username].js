import Head from "next/head";
import { dbConnect } from "../../lib/db-connect";
import { getSession } from "next-auth/client";
import Profile from "../../models/accountProfile/userProfile";
import User from "../../models/account/user";
import TrainingPlan from "../../models/exerciseTracking/trainingPlan";
import GalleryPhotos from "../../models/accountProfile/galleryPhotos";
import ProfileForm from "../../components/forms/ProfilePageForms/ProfileForm";
import GenerateProfileForm from "../../components/forms/ProfilePageForms/ProfileGenerationForm";
import { useRouter } from "next/router";
import { useState } from "react";
import ExerciseHistory from "../../models/exerciseTracking/exerciseHistory";
import FoodHistory from "../../models/calorieTracking/foodHistory";
import LighterDiv from "../../components/ui/LighterDiv";
import { useLoadingStore } from "../../context/loadingScreen";
import { useStore } from "../../context";
import { getValue } from "../../utils/common";
import ProfileViews from "../../components/forms/ProfilePageForms/ProfileViews";

function ProfileView(props) {
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const [state] = useStore();
  const user = getValue(state, ["user"], null);

  // List of Exercise History Dates
  const listOfExerciseHistoryDates = [];
  if (props.exerciseHistoryDates)
    props.exerciseHistoryDates.map((exercise) =>
      listOfExerciseHistoryDates.push(new Date(exercise.dateOfExercise))
    );

  // List of Food History Dates
  const listOfFoodHistoryDates = [];
  if (props.foodHistoryDates)
    props.foodHistoryDates.map((food) =>
      listOfFoodHistoryDates.push(new Date(food.dateEaten))
    );

  // Function to generate profile if it has not been created properly
  async function generateProfile() {
    showLoadingScreen({ type: true });
    const newUserProfile = {
      username: props.user.username,
      personalTrainerProfile: false,
    };
    const userProfileResponse = await fetch(
      "/api/account/account_creation/user_profile",
      {
        method: "POST",
        body: JSON.stringify(newUserProfile),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const userProfileData = await userProfileResponse.json();

    if (userProfileData.hasError) {
      setErrorMessage(userProfileData.errorMessage);
      if (userProfileData.errorMessage != "This ID already has a profile!") {
        setErrorMessage(
          "Failed to generate this profile. Please refresh and try again!"
        );
      }
      await router.push("/userProfile/" + props.user.username);
    }

    showLoadingScreen({ type: false });
  }

  // Function to remove training plan
  async function handleRemoveTrainingPlan(trainingPlanId) {
    showLoadingScreen({ type: true });
    const bodyData = {
      trainingPlanId: trainingPlanId,
      username: user.username,
    };

    const response = await fetch("/api/exerciseTracking/training_plans", {
      method: "DELETE",
      body: JSON.stringify(bodyData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
    } else {
      setErrorMessage(null);
    }
    await router.push("/userProfile/" + props.user.username);
    showLoadingScreen({ type: false });
  }

  // Function to update privacy level of a photo
  async function handleUpdatePrivacyOfPhoto(postData) {
    showLoadingScreen({ type: true });
    const bodyData = {
      galleryPhotoId: postData.id,
      username: user.username,
      privatePhoto: postData.privatePhoto,
    };

    const response = await fetch("/api/account/account_profile/gallery", {
      method: "PUT",
      body: JSON.stringify(bodyData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
    } else {
      setErrorMessage(null);
    }
    await router.push("/userProfile/" + props.user.username);
    showLoadingScreen({ type: false });
  }

  // Function to remove a photo
  async function handleRemovePhoto(id) {
    showLoadingScreen({ type: true });
    const bodyData = {
      galleryPhotoId: id,
      username: user.username,
    };

    const response = await fetch("/api/account/account_profile/gallery", {
      method: "DELETE",
      body: JSON.stringify(bodyData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
    } else {
      setErrorMessage(null);
    }
    await router.push("/userProfile/" + props.user.username);
    showLoadingScreen({ type: false });
  }

  // Function to redirect to next page
  async function handleNextPageNavigation() {
    showLoadingScreen({ type: true });
    await router.push(
      "/userProfile/" +
        props.user.username +
        "?pageNumber=" +
        (Number(props.pageNumber) + Number(1))
    );
    showLoadingScreen({ type: false });
    window.scrollTo({
      bottom: 0,
      behavior: "auto",
    });
  }

  // Function to redirect to previous page
  async function handlePrevPageNavigation() {
    showLoadingScreen({ type: true });
    await router.push(
      "/userProfile/" +
        props.user.username +
        "?pageNumber=" +
        (Number(props.pageNumber) - Number(1))
    );
    showLoadingScreen({ type: false });
    window.scrollTo({
      bottom: 0,
      behavior: "auto",
    });
  }

  return (
    <>
      <Head>
        <title>{props.user.username}'s Profile</title>
        <meta
          name="Xtreme Tracking Profile Page"
          content={"View " + props.user.username + "'s Profile here!"}
        />
      </Head>
      {
        // Checks if user profile exists, if not provides profile generation form
        // If profile exists, shows user profile
      }
      {!props.userprofile ? (
        <>
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
          <LighterDiv>
            <GenerateProfileForm
              username={props.user.username}
              handleGeneration={generateProfile}
            />
          </LighterDiv>
        </>
      ) : (
        <>
          <LighterDiv>
            <ProfileForm
              user={props.user}
              userprofile={props.userprofile}
              ownProfile={props.user.username == user.username}
            />
          </LighterDiv>
          <ProfileViews
            exerciseHistory={props.exerciseHistory}
            listOfExerciseHistoryDates={listOfExerciseHistoryDates}
            foodHistory={props.foodHistory}
            listOfFoodHistoryDates={listOfFoodHistoryDates}
            trainingPlansList={props.trainingPlansList}
            handleRemoveTrainingPlan={handleRemoveTrainingPlan}
            galleryPhotoList={props.galleryPhotoList}
            handleUpdatePrivacyOfPhoto={handleUpdatePrivacyOfPhoto}
            handleRemovePhoto={handleRemovePhoto}
            ownProfile={props.user.username == user.username}
            user={props.user}
            pageNumber={props.pageNumber}
            handleNextPageNavigation={
              props.hasNextPage ? handleNextPageNavigation : null
            }
            handlePrevPageNavigation={
              props.hasPrevPage ? handlePrevPageNavigation : null
            }
          />
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  // Connecting to DB to find User & User Profile
  let selectedUser;
  try {
    const username = context.query.username.toLowerCase();
    await dbConnect();

    const req = context.req;
    const session = await getSession({ req });

    // Finding user account details and profile details
    const usernameFilter = { username: username };
    selectedUser = await User.findOne(usernameFilter);
    const userId = selectedUser.id;
    const selectedProfile = await Profile.findOne({ _id: userId });

    // Finds profile picture Id, or chooses default photo if this does not exist
    if (
      !selectedProfile.profilePictureId &&
      (selectedProfile.profilePictureId =
        process.env.DEFAULT_PROFILE_PICTURE_ID)
    );

    // EXERCISE HISTORY INFORMATION
    const exerciseHistory = await ExerciseHistory.find({
      username: username,
    }).sort({ dateOfExercise: 1 });

    const trainingPlansList = await TrainingPlan.find({
      username: username,
    }).sort({ _id: 1 });
    // END OF EXERCISE HISTORY INFORMATION

    // GALLERY PAGINATION INFORMATION
    const pageNumber =
      context.query.pageNumber && context.query.pageNumber > 0
        ? context.query.pageNumber
        : 1;
    let paginateQuery;
    if (session && session.user.username == username) {
      paginateQuery = {
        username: username,
      };
    } else {
      paginateQuery = {
        username: username,
        privatePhoto: false,
      };
    }

    const paginateOptions = {
      page: pageNumber,
      limit: 3,
      collation: {
        locale: "en",
      },
      sort: { createdAt: -1 },
    };

    const galleryPhotoList = await GalleryPhotos.paginate(
      paginateQuery,
      paginateOptions
    );

    const hasNextPage = pageNumber < galleryPhotoList.pages;
    const hasPrevPage = pageNumber > 1;
    // END OF GALLERY PAGINATION INFORMATION

    // FOOD INFORMATION
    const foodHistory = await FoodHistory.find({
      username: username,
    }).sort({ gramsEaten: 1 });
    // END OF FOOD INFORMATION

    // Returns relevant information found
    return {
      props: {
        user: {
          id: selectedUser.id,
          username: selectedUser.username,
          forename: selectedUser.forename,
          surname: selectedUser.surname,
          streakCount: selectedUser.streakCount,
        },
        userprofile: {
          profilePictureId: selectedProfile.profilePictureId,
          profileDescription: selectedProfile.profileDescription,
          personalTrainerProfile: selectedProfile.personalTrainerProfile,
        },
        exerciseHistory: exerciseHistory.map((exercise) => ({
          id: exercise._id.toString(),
          username: exercise.username,
          exerciseName: exercise.exerciseName,
          weightUsed: exercise.weightUsed,
          numberOfReps: exercise.numberOfReps,
          numberOfSets: exercise.numberOfSets,
          dateOfExercise: exercise.dateOfExercise.toString(),
        })),
        exerciseHistoryDates: exerciseHistory.map((exercise) => ({
          dateOfExercise: exercise.dateOfExercise.toString(),
        })),
        foodHistory: foodHistory.map((food) => ({
          id: food._id.toString(),
          foodName: food.foodName,
          gramsEaten: food.gramsEaten,
          totalCalories: food.totalCalories,
          dateEaten: food.dateEaten.toString(),
        })),
        foodHistoryDates: foodHistory.map((food) => ({
          dateEaten: food.dateEaten.toString(),
        })),
        trainingPlansList: trainingPlansList.map((plan) => ({
          id: plan._id.toString(),
          username: plan.username,
          trainingPlanName: plan.trainingPlanName,
          numberOfExercises: plan.listOfExercises.length,
        })),
        galleryPhotoList: galleryPhotoList.docs.map((photo) => ({
          id: photo._id.toString(),
          photoId: photo.photoId,
          photoDescription: photo.photoDescription,
          privatePhoto: photo.privatePhoto,
          createdAt: photo.createdAt.toString(),
        })),
        pageNumber: pageNumber,
        hasNextPage: hasNextPage,
        hasPrevPage: hasPrevPage,
      },
    };
  } catch (error) {
    if (selectedUser) {
      // Returns user details if profile doesn't exist
      return {
        props: {
          user: {
            id: selectedUser.id,
            username: selectedUser.username,
            forename: selectedUser.forename,
            surname: selectedUser.surname,
          },
        },
      };
    }
    // Returns 'Page Doesn't Exist' if user does not exist
    return {
      notFound: true,
    };
  }
}
export default ProfileView;
