import {
  selectIsAuthenticated,
  selectLoading,
} from "@/features/auth/authSlice";
import { useEffect, type ReactNode } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectLoading);
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/auth/login");
  }, [isAuthenticated, navigate, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
