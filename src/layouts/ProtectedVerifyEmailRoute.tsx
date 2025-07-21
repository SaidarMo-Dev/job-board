import { Navigate } from "react-router";

export function ProtectedVerifyEmailRoute({ children }) {
  const isSignupInProgress =
    sessionStorage.getItem("isSignupInProgress") === "true";

  if (!isSignupInProgress) {
    return <Navigate to="/auth/register" replace />;
  }
  return children;
}
