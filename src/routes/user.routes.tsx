import AuthGuard from "@/guards/authGuard";
import AppLayout from "@/layouts/AppLayout";
import AccountRecovery from "@/pages/AccountRecovery";
import Home from "@/pages/Home";
import JobsHistoryPage from "@/pages/JobsHistoryPage";
import PasswordSecurityPage from "@/pages/PasswordAndSecurity";
import SettingsAndNotificationsPage from "@/pages/SettingsNotifications";
import UserApplications from "@/pages/UserApplicationsPage";
import UserProfilePage from "@/pages/UserProfile";
import UserSavedJobs from "@/pages/UserSavedJobs";
import { Route } from "react-router";

const UserRoutes = (
  <Route
    element={
      <AuthGuard allowedRoles={["User", "JobSeeker"]}>
        <AppLayout />
      </AuthGuard>
    }
  >
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
);

export default UserRoutes;
