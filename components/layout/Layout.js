import MainNavigation from "./MainNavigation";
import { useStore } from "../../context";
import { getValue } from "../../utils/common";
import { getSession } from "next-auth/client";
import { useEffect } from "react";
import { authConstants } from "../../context/constants";
import { useLoadingStore } from "../../context/loadingScreen";

function Layout(props) {
  const [state, dispatch] = useStore();
  const [loadingScreen] = useLoadingStore();

  // UseEffect which identifies if the user has logged in or not
  useEffect(async () => {
    const authenticated = getValue(state, ["user", "authenticated"], false);
    if (!authenticated) {
      dispatch({ type: authConstants.LOGIN_REQUEST });
      const session = await getSession();
      if (session) {
        dispatch({ type: authConstants.LOGIN_SUCCESS, payload: session });
      } else {
        dispatch({ type: authConstants.LOGIN_FAILURE, payload: session });
      }
    }
  }, []);

  return (
    <>
      <MainNavigation/>
      <main>{props.children}</main>
      {loadingScreen}
    </>
  );
}

export default Layout;
