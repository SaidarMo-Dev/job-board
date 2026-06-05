import AppLayout from "@/layouts/AppLayout";
import ConditionalLayout from "@/layouts/ConditionalLayout";
import AuthGuard from "@/guards/authGuard";
import JobApplicationWizardPage from "@/pages/JobApplicationWizardPage";
import JobsPage from "@/pages/JobsPage";
import { Route } from "react-router";

const JobRoutes = (
  <>
    {/* Public */}
    <Route path="/jobs" element={<ConditionalLayout />}>
      <Route index element={<JobsPage />} />
    </Route>

    {/* Private */}
    <Route
      element={
        <AuthGuard allowedRoles={["User", "JobSeeker"]}>
          <AppLayout />
        </AuthGuard>
      }
    >
      <Route path="/jobs/:jobId/apply" element={<JobApplicationWizardPage />} />
    </Route>
  </>
);

export default JobRoutes;
