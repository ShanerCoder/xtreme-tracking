import { createContext, useContext, useReducer } from "react";
import { authConstants } from "./constants";

const Store = createContext();

// Reducer to identify if the user is authenticating, logged in or failed to log in
const reducer = (state, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST: {
      return {
        ...state,
        user: {
          ...state.user,
          authenticating: true,
        },
      };
    }
    case authConstants.LOGIN_SUCCESS: {
      return {
        ...state,
        user: {
          ...action.payload.user,
          authenticating: false,
          authenticated: true,
        },
      };
    }
    case authConstants.LOGIN_FAILURE: {
      return {
        ...state,
        user: {
          ...state.user,
          error: action.payload,
          authenticating: false,
          authenticated: false,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export const useStore = () => useContext(Store);

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: {
      authenticated: false,
      authenticating: false,
      error: null,
    },
  });

  return <Store.Provider value={[state, dispatch]}>{children}</Store.Provider>;
};
