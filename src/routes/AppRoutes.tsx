import { Route, Routes } from "react-router";
import RegisterPage from "../pages/Auth/ResgisterPage";
import LoginPage from "../pages/Auth/LoginPage";
import { LandingPage } from "../pages/LandingPage";
import SendConfirmEmailPage from "../pages/Auth/SendConfirmEmailPage";
import ConfirmEmail from "../pages/Auth/ConfirmEmail";
import Home from "../pages/Home";
import JobsPage from "../pages/JobsPage";
import UserProfilePage from "@/pages/UserProfile";
import UserApplications from "@/pages/UserApplicationsPage";
import UserSavedJobs from "@/pages/UserSavedJobs";
import MainLayout from "@/layouts/MainLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route element={<MainLayout />}>
        <Route path="/members" element={<Home />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/members/profile" element={<UserProfilePage />} />
        <Route path="/members/applications" element={<UserApplications />} />
        <Route path="/members/jobs" element={<UserSavedJobs />} />
      </Route>

      <Route path="/auth">
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="send-confirm-email" element={<SendConfirmEmailPage />} />
        <Route path="confirm-email" element={<ConfirmEmail />} />
      </Route>
    </Routes>
  );
}
