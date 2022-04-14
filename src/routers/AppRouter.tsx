import { Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import PrivacyPolicy from "../pages/privacyPolicy/PrivacyPolicy";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="register" element={<Login register />} />
      <Route path="password-recovery" element={<Login passwordRecovery />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  );
}
