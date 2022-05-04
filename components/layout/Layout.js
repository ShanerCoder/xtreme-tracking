import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import { useStore } from "../../context";
import { getValue } from "../../utils/common";
import { getSession } from "next-auth/client";

function Layout(props) {
  const [state, dispatch] = useStore();
  const user = getValue(state, ["user"], null);
  const authenticated = getValue(state, ["user", "authenticated"], false);

  //console.log({ state });

  return (
    <div>
      <MainNavigation authenticated={authenticated} />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
