import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import { useStore } from "../../context";
import { getValue } from "../../utils/common";
import { getSession } from "next-auth/client";
import { useEffect } from "react";
import { authConstants } from "../../context/constants";
import useFullPageLoader from "../hooks/useFullPageLoader";

function Layout(props) {
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [state, dispatch] = useStore();
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
      <MainNavigation showLoader={showLoader} hideLoader={hideLoader} />
      <main className={classes.main}>{props.children}</main>
      {loader}
    </>
  );
}

export default Layout;
