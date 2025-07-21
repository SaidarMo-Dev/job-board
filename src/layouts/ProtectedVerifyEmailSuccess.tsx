import type { JSX } from "react";
import { Navigate } from "react-router";

export function ProtectedVerifyEmailSuccess({
  children,
}: {
  children: JSX.Element;
}) {
  const emailVerified = sessionStorage.getItem("emailVerified") === "true";

  if (!emailVerified) return <Navigate to={"/auth/register"} replace />;

  return children;
}
