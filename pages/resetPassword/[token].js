import Head from "next/head";
import ResetPasswordForm from "../../components/forms/SignInForms/ForgotPasswordForms/ResetPasswordForm";
import { dbConnect } from "../../lib/db-connect";
import Token from "../../models/token";
import bcrypt from "bcrypt";
import { useState } from "react";
import { useRouter } from "next/router";
import { useLoadingStore } from "../../context/loadingScreen";

function ResetPasswordView(props) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  const router = useRouter();

  async function resetPasswordSubmitHandler(newPassword) {
    showLoadingScreen({ type: true });
    const resetPassword = {
      password: newPassword,
      userId: props.userId,
      queryToken: props.queryToken,
    };

    const response = await fetch("/api/account/passwords/reset_password", {
      method: "PUT",
      body: JSON.stringify(resetPassword),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
      await router.push(
        `/resetPassword/${props.queryToken}?id=${props.userId}`
      );
    } else {
      setErrorMessage(null);
      await router.push("/login");
    }
    showLoadingScreen({ type: false });
  }

  return (
    <>
      <Head>
        <title>Reset Password</title>
        <meta
          name="Xtreme Tracking Reset Password Page"
          content="Reset your account's password here!"
        />
      </Head>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      {props.validToken ? (
        <ResetPasswordForm
          onSubmit={resetPasswordSubmitHandler}
          setErrorMessage={setErrorMessage}
        />
      ) : (
        <h1 className="center">
          This Link is invalid or has expired. Please request a new password
          reset email.
        </h1>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const queryToken = context.query.token;
    const userId = context.query.id;

    await dbConnect();
    const token = await Token.findOne({ userId });

    const isValid = await bcrypt.compare(queryToken, token.token);

    if (isValid) {
      return {
        props: {
          validToken: true,
          userId: userId,
          queryToken: queryToken,
        },
      };
    } else {
      return {
        props: {
          validToken: false,
        },
      };
    }
  } catch (error) {
    return {
      props: {
        validToken: false,
      },
    };
  }
}
export default ResetPasswordView;
