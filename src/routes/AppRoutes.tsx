import { Route, Routes } from "react-router";
import RegisterPage from "../pages/Auth/ResgisterPage";
import LoginPage from "../pages/Auth/LoginPage";
import { LandingPage } from "../pages/LandingPage";
import SendConfirmEmailPage from "../pages/Auth/SendConfirmEmailPage";
import ConfirmEmail from "../pages/Auth/ConfirmEmail";
import Home from "../pages/Home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      
      <Route path="/auth">
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="send-confirm-email" element={<SendConfirmEmailPage />} />
        <Route path="confirm-email" element={<ConfirmEmail />} />
      </Route>
    </Routes>
  );
}
