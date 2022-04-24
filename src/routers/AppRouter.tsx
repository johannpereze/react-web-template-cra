import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import PrivacyPolicy from "../pages/privacyPolicy/PrivacyPolicy";

export default function AppRouter() {
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
