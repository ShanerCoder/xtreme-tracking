import Head from "next/head";
import RegisterForm from "../components/forms/SignInForms/RegisterForm";
import { useRouter } from "next/router";
import { useState } from "react";
import { useStore } from "../context";
import { getValue } from "../utils/common";
import { useLoadingStore } from "../context/loadingScreen";

function RegisterPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  const [state] = useStore();
  const user = getValue(state, ["user"], null);

  // Function to create new user
  async function addUserHandler(newUserData) {
    showLoadingScreen({ type: true });
    const userAccountResponse = await fetch(
      "/api/account/account_creation/user_account",
      {
        method: "POST",
        body: JSON.stringify(newUserData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const userAccountData = await userAccountResponse.json();
    if (userAccountData.hasError) {
      setErrorMessage(userAccountData.errorMessage);
      await router.push("/register");
    } else {
      const newUserProfile = {
        username: newUserData.username,
        personalTrainerProfile: newUserData.personalTrainerProfile,
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
      await userProfileResponse.json();
      setErrorMessage(null);
      await router.push("/login");
    }
    showLoadingScreen({ type: false });
  }

  if (user && user.authenticated) {
    router.replace("/");
  }

  return (
    <>
      <Head>
        <title>Register</title>
        <meta
          name="Xtreme Tracking Registration Page"
          content="Browse meetings available"
        />
      </Head>
      <section>
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        <RegisterForm onAddUser={addUserHandler} />
      </section>
    </>
  );
}
export default RegisterPage;
