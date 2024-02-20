import { useSelector, useDispatch } from "react-redux";
import { setUser, initialState} from "../../store/auth/userSlice";
import jwt from 'jwt-decode'
import { apiSignIn, apiSignOut, apiUserAbout  } from "../../services/AuthService";
import {
  onSignInSuccess,
  onSignOutSuccess,
} from "../../store/auth/sessionSlice";
import appConfig from "../../configs/app.config";
import { useNavigation } from "@react-navigation/core";
// import { useNavigate } from 'react-router-dom'

function useAuth() {
  const dispatch = useDispatch();

  const navigation = useNavigation()

  const { token, signedIn } = useSelector((state) => state.auth.session);

  const signIn = async (values) => {
    try {
      const resp = await apiSignIn(values);
      if (resp.data) {
        const { token } = resp.data;
        dispatch(onSignInSuccess(token));


        const { data } = await apiUserAbout(token);

        let result = data;
        console.log(result);

        const user = jwt(token);
        result.roles = user.roles;

        dispatch(setUser(result));
        // navigate(appConfig.otpVerificationPath)
        return {
          status: "success",
          message: "",
        };
      }
    } catch (errors) {
      console.log(errors?.response);
      return {
        status: "failed",
        message: errors?.response?.data?.message || errors.toString(),
      };
    }
  };

  const confirmSignIn = async (values) => {
    try {
      //const resp = await apiSignIn(values)
      //if (resp.data) {
      //const { token } = resp.data
      setTimeout(() => {
        dispatch(onSignInSuccess("wVYrxaeNa9OxdnULvde1Au5m5w63"));
        // navigate(appConfig.authenticatedEntryPath)
      }, 1000);

      return {
        status: "success",
        message: "",
      };
      //}
    } catch (errors) {
      return {
        status: "failed",
        message: errors?.response?.data?.message || errors.toString(),
      };
    }
  };

  const handleSignOut = () => {
    dispatch(onSignOutSuccess());
    dispatch(setUser(initialState));
    // navigation.navigate(appConfig.unAuthenticatedEntryPath);
  };

  const signOut =  () => {
    // await apiSignOut();
    handleSignOut();
  };

  return {
    authenticated: token && signedIn,
    signIn,
    confirmSignIn,
    signOut,
  };
}

export default useAuth;
