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
import JobsHistoryPage from "@/pages/JobsHistoryPage";
import PasswordSecurityPage from "@/pages/PasswordAndSecurity";
import SettingsAndNotificationsPage from "@/pages/SettingsNotifications";
import AccountRecovery from "@/pages/AccountRecovery";
import JobApplicationWizardPage from "@/pages/JobApplicationWizardPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route element={<MainLayout />}>
        <Route path="/jobs">
          <Route index element={<JobsPage />} />
          <Route path=":jobId/apply" element={<JobApplicationWizardPage />} />
        </Route>

        <Route path="/members">
          <Route index element={<Home />} />
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="applications" element={<UserApplications />} />
          <Route path="jobs" element={<UserSavedJobs />} />
          <Route path="history" element={<JobsHistoryPage />} />
          <Route path="password-security" element={<PasswordSecurityPage />} />
          <Route
            path="password-security/account-recovery"
            element={<AccountRecovery />}
          />
          <Route
            path="settings-notifications"
            element={<SettingsAndNotificationsPage />}
          />
        </Route>
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
