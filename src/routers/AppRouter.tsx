import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { updateUser } from "../Auth/authSlice";
import Backdrop from "../components/backdrop/Backdrop";
import AuthRouter from "./AuthRouter";
import DashboardRouter from "./DashboardRouter";

export default function AppRouter() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const dispatch = useAppDispatch();

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
      console.log(e);
      setCheckingAuth(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (checkingAuth) {
    return <Backdrop />;
  }

  return (
    <Routes>
      <Route path="/*" element={<DashboardRouter />} />
      <Route path="/login" element={<AuthRouter />} />
    </Routes>
  );
}
