import { Route, Routes } from "react-router";
import RegisterPage from "../pages/Auth/ResgisterPage";
import LoginPage from "../pages/Auth/LoginPage";
import { LandingPage } from "../pages/LandingPage";
import SendConfirmEmailPage from "../pages/Auth/SendConfirmEmailPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/register">
        <Route index element={<RegisterPage />} />
        <Route path="confirm-email" element={<SendConfirmEmailPage />} />
      </Route>
    </Routes>
  );
}
