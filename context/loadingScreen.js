import { createContext, useContext, useReducer } from "react";
import FullPageLoader from "../components/layout/FullPageLoader";

const Store = createContext();

// Reducer to show the loading screen or not depending on the action passed in
const reducer = (state, action) => {
  switch (action.type) {
    case true: {
      return <FullPageLoader></FullPageLoader>;
    }
    case false: {
      return null;
    }
    default: {
      return null;
    }
  }
};

export const useLoadingStore = () => useContext(Store);

export const LoadingScreenStoreProvider = ({ children }) => {
  const [loadingScreen, showLoadingScreen] = useReducer(reducer, null);

  return (
    <Store.Provider value={[loadingScreen, showLoadingScreen]}>
      {children}
    </Store.Provider>
  );
};
