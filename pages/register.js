import RegisterForm from "../components/forms/RegisterForm";
import { useRouter } from "next/router";

function RegisterPage() {
  const router = useRouter();

  async function addUserHandler(newUserData) {
    const response = await fetch("/api/user_accounts", {
      method: "POST",
      body: JSON.stringify(newUserData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    router.push("/login");
  }

  return (
    <section>
      <h1>Register Page</h1>
      <RegisterForm onAddUser={addUserHandler} />
    </section>
  );
}
export default RegisterPage;
//OverwriteModelError: Cannot overwrite `user_accounts` model once compiled.
