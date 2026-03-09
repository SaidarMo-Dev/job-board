// AppInitializer.tsx
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { getCurrentUserThunk } from "./features/auth/authThunk";

export default function AppInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initial check on app load (refresh)
    dispatch(getCurrentUserThunk());
  }, [dispatch]);

  return <>{children}</>;
}
