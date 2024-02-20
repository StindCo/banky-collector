import { useSelector, useDispatch } from "react-redux";
import { setUser, initialState } from "../../store/auth/userSlice";
import jwt from "jwt-decode";
import {
  apiSignIn,
  apiSignOut,
  apiUserAbout,
} from "../../services/AuthService";
import {
  onSignInSuccess,
  onSignOutSuccess,
} from "../../store/auth/sessionSlice";
import appConfig from "../../configs/app.config";
import { useNavigation } from "@react-navigation/core";
// import { useNavigate } from 'react-router-dom'

function useAccount() {
  const [accounts, setAccounts] = useState()
}

export default useAccount;
