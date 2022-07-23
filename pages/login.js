import Head from "next/head";
import LoginForm from "../components/forms/SignInForms/LoginForm";
import { getSession, signIn } from "next-auth/client";
import { useState } from "react";
import { useRouter } from "next/router";
import { authConstants } from "../context/constants";
import { useStore } from "../context";
import { getValue } from "../utils/common";
import { useLoadingStore } from "../context/loadingScreen";

function LoginPage() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  const router = useRouter();
  const [state, dispatch] = useStore();
  const user = getValue(state, ["user"], null);

  // Function to authenticate user
  async function authenticateUserHandler(existingUserData) {
    showLoadingScreen({ type: true });
    dispatch({ type: authConstants.LOGIN_REQUEST });
    const result = await signIn("credentials", {
      ...existingUserData,
      redirect: false,
    });
    if (!result.error) {
      const session = await getSession();
      dispatch({ type: authConstants.LOGIN_SUCCESS, payload: session });
      await router.push("/");
      setErrorMessage(null);
    } else {
      dispatch({ type: authConstants.LOGIN_FAILURE, payload: result.error });
      setErrorMessage(result.error);
    }
    showLoadingScreen({ type: false });
  }

  if (user && user.authenticated) {
    router.replace("/");
  }

  return (
    <>
      <Head>
        <title>Login</title>
        <meta
          name="Xtreme Tracking Home Page"
          content="Log into your Xtreme Tracking account here!"
        />
      </Head>
      <section>
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        <LoginForm authenticateUser={authenticateUserHandler} />
      </section>
    </>
  );
}

export default LoginPage;
