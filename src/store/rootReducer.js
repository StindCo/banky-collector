import { combineReducers } from "redux";
import theme from "./theme/themeSlice";
import auth from "./auth";
import account from "./Account/accountSlice";
import base from "./base";
import locale from "./locale/localeSlice";

const rootReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    theme,
    auth,
    base,
    locale,
    account,
    ...asyncReducers,
  });
  return combinedReducer(state, action);
};

export default rootReducer;
