import { useAppSelector } from "@/hooks/useAppSelector";
import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AdminAuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate();

  const isAuthenticated = useAppSelector(
    (state) => state.adminAuthReducer.isAuthenticated
  );

  const isLoading = useAppSelector(
    (state) => state.adminAuthReducer.loading.fetch
  );

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/auth/login");
  }, [isAuthenticated, navigate, isLoading]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
