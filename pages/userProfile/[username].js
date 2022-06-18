import Head from "next/head";
import { dbConnect } from "../../lib/db-connect";
import Profile from "../../models/userProfile";
import User from "../../models/user";
import TrainingPlan from "../../models/trainingPlan";
import ProfileForm from "../../components/forms/ProfilePageForms/ProfileForm";
import GenerateProfileForm from "../../components/forms/ProfilePageForms/ProfileGenerationForm";
import { useRouter } from "next/router";
import { useState } from "react";
import ExerciseHistory from "../../models/exerciseHistory";
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

  const listOfExerciseHistoryDates = [];
  if (props.exerciseHistoryDates)
    props.exerciseHistoryDates.map((exercise) =>
      listOfExerciseHistoryDates.push(new Date(exercise.dateOfExercise))
    );

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
    await router.push("/tracking");
    showLoadingScreen({ type: false });
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
          <GenerateProfileForm
            username={props.user.username}
            handleGeneration={generateProfile}
          />
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
            trainingPlansList={props.trainingPlansList}
            user={props.user}
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

    // Finds user exercise history
    const exerciseHistory = await ExerciseHistory.find({
      username: username,
    }).sort({ dateOfExercise: 1 });

    const trainingPlansList = await TrainingPlan.find({
      username: username,
    }).sort({ _id: 1 });

    return {
      // Returns User and Profile details
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
        trainingPlansList: trainingPlansList.map((plan) => ({
          id: plan._id.toString(),
          username: plan.username,
          trainingPlanName: plan.trainingPlanName,
          numberOfExercises: plan.listOfExercises.length,
        })),
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
