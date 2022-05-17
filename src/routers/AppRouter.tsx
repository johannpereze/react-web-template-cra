import { Backdrop, CircularProgress } from "@mui/material";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { updateUser } from "../Auth/authSlice";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import PrivacyPolicy from "../pages/privacyPolicy/PrivacyPolicy";

export default function AppRouter() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const dispatch = useAppDispatch();

  const getCurrentUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser({
        bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      });
      console.log(user);
      const {
        email: _email,
        family_name: _family_name,
        given_name: _given_name,
        sub,
      } = user.attributes;
      dispatch(
        updateUser({
          userId: sub,
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
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color="primary" />
      </Backdrop>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Login step="login" />} />
      <Route path="/home" element={<Home />} />
      <Route path="register" element={<Login step="register" />} />
      <Route
        path="password-recovery"
        element={<Login step="passwordRecovery" />}
      />
      <Route
        path="confirmation-code"
        element={<Login step="confirmationCode" />}
      />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  );
}
