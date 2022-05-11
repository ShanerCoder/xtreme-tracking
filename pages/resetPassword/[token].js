import ResetPasswordForm from "../../components/forms/ResetPasswordForm";
import { dbConnect } from "../../lib/db-connect";
import Token from "../../models/token";

function ResetPasswordView(props) {
  return (
    <>
      {props.validToken ? (
        <ResetPasswordForm />
      ) : (
        <h1 className="center">Invalid Token</h1>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const token = context.query.token;
    const userId = context.query.id;

    await dbConnect();
    const filter = { token: token };
    const selectedToken = await Token.findOne(filter);
    console.log(selectedToken);
    console.log(userId);
    if (selectedToken && selectedToken.userId == userId) {
      return {
        props: {
          validToken: true,
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
      notFound: true,
    };
  }
}
export default ResetPasswordView;
