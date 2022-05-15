import ResetPasswordForm from "../../components/forms/SignInForms/ForgotPasswordForms/ResetPasswordForm";
import { dbConnect } from "../../lib/db-connect";
import Token from "../../models/token";
import bcrypt from "bcrypt";
import { useState } from "react";
import { useRouter } from "next/router";
function ResetPasswordView(props) {
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  async function resetPasswordSubmitHandler(newPassword) {
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
      router.push(`/resetPassword/${props.queryToken}?id=${props.userId}`);
    } else {
      setErrorMessage(null);
      router.push("/login");
    }
  }

  return (
    <>
      <h1 className="center">Reset your Password</h1>
      {errorMessage && (
        <p style={{ textTransform: "capitalize", color: "red" }}>
          {errorMessage}
        </p>
      )}
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
