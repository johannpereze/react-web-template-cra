import { Auth } from "aws-amplify";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateUser } from "../auth/authSlice";
import Backdrop from "../components/backdrop/Backdrop";
import errorHandler from "../hooks/errorHandler";

interface PublicRouteProps {
  children: JSX.Element;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user_id = useAppSelector((state) => state.auth.user_id);

  const getCurrentUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const {
        email: _email,
        family_name: _family_name,
        given_name: _given_name,
        sub,
      } = user.attributes;
      dispatch(
        updateUser({
          user_id: sub,
          email: _email,
          family_name: _family_name,
          given_name: _given_name,
        })
      );
      setCheckingAuth(false);
    } catch (e) {
      errorHandler(e, enqueueSnackbar, t);
      setCheckingAuth(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (checkingAuth) {
    return <Backdrop />;
  }
  return user_id === "" ? children : <Navigate to="/" />;
}
