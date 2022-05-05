import { signOut } from "next-auth/client";
import { useStore } from ".";
import { getValue } from "../utils/common";
import { authConstants } from "./constants";

export async function checkIfUserIsAuthenticated() {
  const [state, dispatch] = useStore();
  const user = getValue(state, ["user"], null);
  const authenticated = getValue(state, ["user", "authenticated"], false);

  if (authenticated) return true;
  else return false;
}
