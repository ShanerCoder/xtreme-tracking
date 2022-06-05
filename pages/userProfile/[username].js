import Head from "next/head";
import { dbConnect } from "../../lib/db-connect";
import Profile from "../../models/userProfile";
import User from "../../models/user";
import ProfileForm from "../../components/forms/ProfilePageForms/ProfileForm";
import GenerateProfileForm from "../../components/forms/ProfilePageForms/ProfileGenerationForm";
import { useRouter } from "next/router";
import { useState } from "react";
import ExerciseHistory from "../../models/exerciseHistory";
import Calendar from "../../components/ui/Calendar";
import LighterDiv from "../../components/ui/LighterDiv";
import DarkerDiv from "../../components/ui/DarkerDiv";
import ExercisesAtDateSection from "../../components/forms/TrackingForm/ExercisesAtDateSection";
import Card from "../../components/ui/Card";
import { useLoadingStore } from "../../context/loadingScreen";

function ProfileView(props) {
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());

  const listOfExerciseHistoryDates = [];
  if (props.exerciseHistoryDates)
    props.exerciseHistoryDates.map((exercise) =>
      listOfExerciseHistoryDates.push(new Date(exercise.dateOfExercise))
    );

  function setSelectedDateInfo(date) {
    setSelectedDate(date.toDateString());
  }

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
            <ProfileForm user={props.user} userprofile={props.userprofile} />
          </LighterDiv>
          <DarkerDiv>
            <h2 className="center">
              Exercise History for date: {selectedDate}
            </h2>
            <Calendar
              listOfDates={listOfExerciseHistoryDates}
              setTitleSelectedDate={setSelectedDateInfo}
            />
          </DarkerDiv>
          <LighterDiv>
            {props.exerciseHistory.length ? (
              <ExercisesAtDateSection
                username={props.user.username}
                exercises={props.exerciseHistory}
                selectedDate={selectedDate}
              />
            ) : (
              <Card>
                <h3 className="center" style={{ padding: "15px" }}>
                  No Exercises Have been added
                </h3>
              </Card>
            )}
          </LighterDiv>
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

    return {
      // Returns User and Profile details
      props: {
        user: {
          id: selectedUser.id,
          username: selectedUser.username,
          forename: selectedUser.forename,
          surname: selectedUser.surname,
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
