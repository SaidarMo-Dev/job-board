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
  const authentoicated = localStorage.getItem("IS_AUTHENCATED") === "true";

  useEffect(() => {
    // Initial check on app load (refresh)
    if (authentoicated) dispatch(getCurrentUserThunk());
  }, [dispatch, authentoicated]);

  return <>{children}</>;
}
