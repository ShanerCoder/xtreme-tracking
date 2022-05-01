import RegisterForm from "../components/forms/RegisterForm";
import { useRouter } from "next/router";

function RegisterPage() {
  const router = useRouter();

  async function addUserHandler(newUserData) {
    const response = await fetch("/api/user-accounts", {
      method: "POST",
      body: JSON.stringify(newUserData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(newUserData);
    console.log(response);
    const data = await response.json();
    console.log(data.hasError);
    //router.push("/");
  }

  return (
    <section>
      <h1>Register Page</h1>
      <RegisterForm onAddUser={addUserHandler} />
    </section>
  );
}
export default RegisterPage;
