import Loader from "@/components/Loaders/Loader";
import { checkAuthThunk } from "@/features/auth/authThunk";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import type { RootState } from "@/store";
import { useEffect, type ReactNode } from "react";
import { Navigate } from "react-router";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const dispatch = useAppDispatch();

  const { authStatus, currentUser, loading } = useAppSelector(
    (state: RootState) => state.authReducer,
  );

  useEffect(() => {
    if (!currentUser && authStatus == "authenticated") {
      dispatch(checkAuthThunk());
    }
  }, [dispatch, currentUser, authStatus]);

  // Show loader during any checking state or while loading is true or authneticated and no user loaded
  if (
    authStatus === "checking" ||
    (authStatus === "authenticated" && !currentUser) ||
    loading
  ) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader variant="spinner" size="sm" />
      </div>
    );
  }

  // redirect if not authenticated
  if (authStatus !== "authenticated") {
    return <Navigate to="/auth/login" replace />;
  }

  // Authenticated → render protected content
  return <>{children}</>;
}
