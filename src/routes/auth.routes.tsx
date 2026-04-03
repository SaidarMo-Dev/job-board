import { ProtectedVerifyEmailRoute } from "@/layouts/ProtectedVerifyEmailRoute";
import { ProtectedVerifyEmailSuccess } from "@/layouts/ProtectedVerifyEmailSuccess";
import { ConfirmEmailPage } from "@/pages/Auth/ConfirmEmailPage";
import LoginPage from "@/pages/Auth/LoginPage";
import RegisterPage from "@/pages/Auth/ResgisterPage";
import VerificationSucess from "@/pages/Auth/VerificationSuccess";
import { Route } from "react-router";

const AuthRoutes = (
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
);

export default AuthRoutes;
