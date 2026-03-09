import { Route, Routes } from "react-router";
import RegisterPage from "../pages/Auth/ResgisterPage";
import LoginPage from "../pages/Auth/LoginPage";
import { LandingPage } from "../pages/LandingPage";
import Home from "../pages/Home";
import JobsPage from "../pages/JobsPage";
import UserProfilePage from "@/pages/UserProfile";
import UserApplications from "@/pages/UserApplicationsPage";
import UserSavedJobs from "@/pages/UserSavedJobs";
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
import CategoriesManagementPage from "@/features/admin/pages/CategoriesManagementPage";
import CompaniesManagementPage from "@/features/admin/pages/CompaniesManagementPage";
import AddEditCompany from "@/features/admin/companies/pages/AddEditCompany";
import JobsManagementPage from "@/features/admin/pages/JobsManagementPage";
import AddEditJobPage from "@/features/admin/jobs/pages/AddEditJobPage";
import UserDashboardLayout from "@/layouts/UserDashboardLayout";
import ContactPage from "@/pages/ContactUs";
import ForgotPasswordPage from "@/features/forgot_password/ForgotPasswordPage";
import ResetPasswordPage from "@/features/reset_password/ResetPasswordPage";
import RecruitmentPage from "@/features/employer/pages/RecruitmentPage";
import AuthGuard from "@/pages/Auth/authGuard";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}

      {/* Main page */}
      <Route path="/" element={<LandingPage />} />
      {/* contact us */}
      <Route
        path={ROUTES.PUBLIC.CONTACT}
        element={
          <PublicLayout>
            <ContactPage />
          </PublicLayout>
        }
      />
      {/* Jobs */}
      <Route path="/jobs">
        <Route
          index
          element={
            <PublicLayout>
              <JobsPage />
            </PublicLayout>
          }
        />
        <Route
          path=":jobId/apply"
          element={
            <AuthGuard>
              <PublicLayout>
                <JobApplicationWizardPage />
              </PublicLayout>
            </AuthGuard>
          }
        />
      </Route>
      {/* Forgot password */}
      <Route
        path={ROUTES.PUBLIC.FORGOT_PASSWORD}
        element={<ForgotPasswordPage />}
      />
      {/* reset password */}
      <Route
        path={ROUTES.PUBLIC.RESET_PASSWORD}
        element={<ResetPasswordPage />}
      />

      {/* Admin dashboard routes */}
      <Route element={<DashboardLayout />}>
        <Route
          path={ROUTES.ADMIN.DASHBOARD}
          element={<AdminLayout>{<Dashboard />}</AdminLayout>}
        />
        <Route
          path={ROUTES.ADMIN.PROFILE}
          element={<AdminLayout>{<AdminProfile />}</AdminLayout>}
        />

        {/* users management routes */}
        <Route
          path={ROUTES.ADMIN.USERS}
          element={<AdminLayout>{<UsersManagement />}</AdminLayout>}
        />

        {/* skills management routes */}
        <Route
          path={ROUTES.ADMIN.SKILLS}
          element={<AdminLayout>{<SkillsManagement />}</AdminLayout>}
        />

        {/* categories management routes */}
        <Route
          path={ROUTES.ADMIN.CATEGORIES}
          element={<AdminLayout>{<CategoriesManagementPage />}</AdminLayout>}
        />

        {/* companies management routes */}
        <Route
          path={ROUTES.ADMIN.COMPANIES.LIST}
          element={<AdminLayout>{<CompaniesManagementPage />}</AdminLayout>}
        />
        <Route
          path={ROUTES.ADMIN.COMPANIES.ADD}
          element={<AdminLayout>{<AddEditCompany mode="Add" />}</AdminLayout>}
        />
        <Route
          path={"/preview/admin/companies/:Id/Edit"}
          element={<AdminLayout>{<AddEditCompany mode="Edit" />}</AdminLayout>}
        />

        {/* jobs management routes */}
        <Route
          path={ROUTES.ADMIN.JOBS.LIST}
          element={<AdminLayout>{<JobsManagementPage />}</AdminLayout>}
        />
        <Route
          path={ROUTES.ADMIN.JOBS.ADD}
          element={<AdminLayout>{<AddEditJobPage mode="Add" />}</AdminLayout>}
        />
      </Route>

      {/* Member routes */}

      <Route element={<UserDashboardLayout />}>
        <Route path="/members">
          <Route index element={<Home />} />
          <Route path="profile" element={<UserProfilePage />} />

          <Route
            path={ROUTES.MEMBER.RECRUITMENT.HOME}
            element={<RecruitmentPage />}
          />
          <Route
            path={ROUTES.MEMBER.RECRUITMENT.JOBS.ADD}
            element={<AddEditJobPage mode="Add" />}
          />

          <Route
            path={"/members/recruitment/:id/Edit"}
            element={<AddEditJobPage mode="Edit" />}
          />

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
