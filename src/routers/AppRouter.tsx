import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import PrivacyPolicy from "../pages/privacyPolicy/PrivacyPolicy";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="register" element={<Login register />} />
      <Route path="password-recovery" element={<Login passwordRecovery />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  );
}
