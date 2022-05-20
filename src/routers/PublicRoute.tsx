import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setUser } from "../auth/authSlice";
import Backdrop from "../components/backdrop/Backdrop";

interface PublicRouteProps {
  children: JSX.Element;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const [checkingAuth, setCheckingAuth] = useState(true);
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
        setUser({
          user_id: sub,
          email: _email,
          family_name: _family_name,
          given_name: _given_name,
        })
      );
      setCheckingAuth(false);
    } catch (e) {
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
