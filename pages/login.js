import LoginForm from "../components/forms/LoginForm";

function LoginPage() {
  function authenticateUserHandler(existingUserData) {
    console.log(existingUserData);
  }

  return (
    <section>
      <h1>Login Page</h1>
      <LoginForm authenticateUser={authenticateUserHandler} />
    </section>
  );
}

export default LoginPage;
