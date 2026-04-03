import AppLayout from "@/layouts/AppLayout";
import ConditionalLayout from "@/layouts/ConditionalLayout";
import AuthGuard from "@/guards/authGuard";
import JobApplicationWizardPage from "@/pages/JobApplicationWizardPage";
import JobsPage from "@/pages/JobsPage";
import { Route } from "react-router";

const JobRoutes = (
  <Route path="/jobs" element={<ConditionalLayout />}>
    {/* Public */}
    <Route index element={<JobsPage />} />

    {/* Private */}
    <Route
      element={
        <AuthGuard allowedRoles={["User", "JobSeeker"]}>
          <AppLayout />
        </AuthGuard>
      }
    >
      <Route path=":jobId/apply" element={<JobApplicationWizardPage />} />
    </Route>
  </Route>
);

export default JobRoutes;
