import Loader from "@/components/Loaders/Loader";
import { useAppSelector } from "@/hooks/useAppSelector";
import type { RootState } from "@/store";
import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isInitializing, currentUser } = useAppSelector(
    (state: RootState) => state.authReducer,
  );

  const location = useLocation();

  // Show loader during any checking state or while loading is true or authneticated and no user loaded
  if (isInitializing) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader variant="spinner" size="sm" />
      </div>
    );
  }

  // redirect if not authenticated
  if (!currentUser) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Authenticated → render protected content
  return <>{children}</>;
}
