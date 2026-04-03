import { Route } from "react-router";
import { LandingPage } from "@/pages/LandingPage";
import CompaniesPage from "@/features/companies/public/pages/CompaniesPage";
import { CompanyProfilePage } from "@/features/companies/public/pages/CompanyProfilePage";
import { ROUTES } from "@/constants/routes";
import ContactPage from "@/pages/ContactUs";
import ForgotPasswordPage from "@/features/forgot_password/ForgotPasswordPage";
import ResetPasswordPage from "@/features/reset_password/ResetPasswordPage";
import ConditionalLayout from "@/layouts/ConditionalLayout";

const PublicRoutes = (
  <Route element={<ConditionalLayout />}>
    <Route path="/" element={<LandingPage />} />
    <Route path={ROUTES.PUBLIC.CONTACT} element={<ContactPage />} />

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

    {/* Public company routes */}
    <Route path={ROUTES.PUBLIC.COMPANIES.ROOT} element={<CompaniesPage />} />
    <Route
      path={ROUTES.PUBLIC.COMPANIES.PROFILE(":slug")}
      element={<CompanyProfilePage />}
    />
  </Route>
);

export default PublicRoutes;
