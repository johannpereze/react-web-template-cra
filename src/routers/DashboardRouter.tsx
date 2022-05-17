import { Route, Routes } from "react-router-dom";
import Counter from "../components/counter/Counter";
import Header from "../components/header/Header";
import ThemeSelector from "../components/themeSelector/ThemeSelector";
import Home from "../pages/home/Home";

export default function DashboardRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="counter" element={<Counter />} />
        <Route path="settings" element={<ThemeSelector />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}
