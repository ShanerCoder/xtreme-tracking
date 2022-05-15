import RegisterForm from "../components/forms/SignInForms/RegisterForm";
import { useRouter } from "next/router";
import { useState } from "react";
import { useStore } from "../context";
import { getValue } from "../utils/common";

function RegisterPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const [state] = useStore();
  const user = getValue(state, ["user"], null);

  async function addUserHandler(newUserData) {
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
      router.push("/register");
    } else {
      const username = userAccountData.body.username;
      const userProfileResponse = await fetch(
        "/api/account/account_creation/user_profile",
        {
          method: "POST",
          body: JSON.stringify(username),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await userProfileResponse.json();
      setErrorMessage(null);
      router.push("/login");
    }
  }

  if (user && user.authenticated) {
    router.replace("/");
  }

  return (
    <section>
      <h1>Register Page</h1>
      {errorMessage && (
        <p style={{ textTransform: "capitalize", color: "red" }}>
          {errorMessage}
        </p>
      )}
      <RegisterForm onAddUser={addUserHandler} />
    </section>
  );
}
export default RegisterPage;
