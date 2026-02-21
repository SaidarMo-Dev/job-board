import Loader from "@/components/Loaders/Loader";
import { getAdminProfileThunk } from "@/features/admin/auth/adminThunk";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import type { RootState } from "@/store";
import { useEffect, type ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface AdminAuthGuardProps {
  children: ReactNode;
}

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const dispatch = useAppDispatch();
  const { admin, loading, isAuthenticated } = useSelector(
    (state: RootState) => state.adminAuthReducer,
  );

  // Fetch admin profile if not already loaded
  useEffect(() => {
    if (isAuthenticated && !admin) {
      dispatch(getAdminProfileThunk());
    }
  }, [isAuthenticated, dispatch, admin]);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // Show loading while fetching profile
  if (loading.fetch || !admin) {
    return (
      <div className="h-screen flex justify-center items-center ">
        <Loader variant="spinner" size="sm" />
      </div>
    );
  }

  return <>{children}</>;
}
