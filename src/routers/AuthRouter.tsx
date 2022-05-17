import { Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import PrivacyPolicy from "../pages/privacyPolicy/PrivacyPolicy";

export default function AuthRouter() {
  return (
    <Routes>
      <Route path="register" element={<Login step="register" />} />
      <Route
        path="/password-recovery"
        element={<Login step="passwordRecovery" />}
      />
      <Route
        path="/confirmation-code"
        element={<Login step="confirmationCode" />}
      />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/" element={<Login step="login" />} />
    </Routes>
  );
}
