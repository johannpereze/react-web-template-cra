import { Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="register" element={<Login register />} />
    </Routes>
  );
}
