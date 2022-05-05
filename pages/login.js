import LoginForm from "../components/forms/LoginForm";
import { getSession, signIn } from "next-auth/client";
import { useState } from "react";
import { useRouter } from "next/router";
import { authConstants } from "../context/constants";
import { useStore } from "../context";
import { getValue } from "../utils/common";

function LoginPage() {
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  const [state, dispatch] = useStore();
  const user = getValue(state, ["user"], null);

  async function authenticateUserHandler(existingUserData) {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    const result = await signIn("credentials", {
      ...existingUserData,
      redirect: false,
    });
    if (!result.error) {
      const session = await getSession();
      dispatch({ type: authConstants.LOGIN_SUCCESS, payload: session });
      //router.replace('/');
      setErrorMessage(null);
    } else {
      dispatch({ type: authConstants.LOGIN_FAILURE, payload: result.error });
      setErrorMessage(result.error);
    }
  }

  if (user && user.authenticated) {
    router.replace("/");
  }

  return (
    <section>
      <h1>Login Page</h1>
      {errorMessage && (
        <p style={{ textTransform: "capitalize", color: "red" }}>
          {errorMessage}
        </p>
      )}
      <LoginForm authenticateUser={authenticateUserHandler} />
    </section>
  );
}

export default LoginPage;
