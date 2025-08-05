import { Route, Routes } from "react-router";
import RegisterPage from "../pages/Auth/ResgisterPage";
import LoginPage from "../pages/Auth/LoginPage";
import { LandingPage } from "../pages/LandingPage";
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
import { NotFound } from "@/pages/NotFound";
import { ConfirmEmailPage } from "@/pages/Auth/ConfirmEmailPage";
import VerificationSucess from "@/pages/Auth/VerificationSuccess";
import { ProtectedVerifyEmailRoute } from "@/layouts/ProtectedVerifyEmailRoute";
import { ProtectedVerifyEmailSuccess } from "@/layouts/ProtectedVerifyEmailSuccess";
import PublicLayout from "@/layouts/PublicLayout";
import AdminLayout from "@/features/admin/layout/AdminLayout";
import Dashboard from "@/features/admin/dashboard/components/Dashboard";
import UsersManagement from "@/features/admin/pages/UsersManagement";
import DashboardLayout from "@/features/admin/layout/DashboardLayout";
import { ROUTES } from "@/constants/routes";
import AdminProfile from "@/features/admin/profile/pages/AdminProfilePage";
import SkillsManagement from "@/features/admin/pages/SkillsManagementPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route
          path={ROUTES.ADMIN.DASHBOARD}
          element={<AdminLayout>{<Dashboard />}</AdminLayout>}
        />
        <Route
          path={ROUTES.ADMIN.PROFILE}
          element={<AdminLayout>{<AdminProfile />}</AdminLayout>}
        />

        <Route
          path={ROUTES.ADMIN.USERS}
          element={<AdminLayout>{<UsersManagement />}</AdminLayout>}
        />
        <Route
          path={ROUTES.ADMIN.SKILLS}
          element={<AdminLayout>{<SkillsManagement />}</AdminLayout>}
        />
      </Route>

      <Route path="/" element={<LandingPage />} />

      <Route path="/jobs" element={<PublicLayout />}>
        <Route index element={<JobsPage />} />
        <Route path=":jobId/apply" element={<JobApplicationWizardPage />} />
      </Route>

      <Route element={<MainLayout />}>
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
        <Route
          path="confirm-email"
          element={
            <ProtectedVerifyEmailRoute>
              <ConfirmEmailPage />
            </ProtectedVerifyEmailRoute>
          }
        />
        <Route
          path="confirm-email/success"
          element={
            <ProtectedVerifyEmailSuccess>
              <VerificationSucess />
            </ProtectedVerifyEmailSuccess>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
