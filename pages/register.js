import RegisterForm from "../components/forms/RegisterForm";
import { useRouter } from "next/router";
import { useState } from "react";

function RegisterPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);

  async function addUserHandler(newUserData) {
    const response = await fetch("/api/user_accounts", {
      method: "POST",
      body: JSON.stringify(newUserData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
      router.push("/register");
    } else {
      setErrorMessage(null);
      router.push("/login");
    }
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
//OverwriteModelError: Cannot overwrite `user_accounts` model once compiled.
