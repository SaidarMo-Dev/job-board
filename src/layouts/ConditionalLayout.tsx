import { useAppSelector } from "@/hooks/useAppSelector";
import PublicLayout from "./PublicLayout";
import EmployerLayout from "./EmployerLayout";
import AppLayout from "./AppLayout";

export default function ConditionalLayout() {
  const { currentUser } = useAppSelector((state) => state.authReducer);
  const isLoading = useAppSelector((state) => state.authReducer.loading);

  if (isLoading) return null;

  if (!currentUser) {
    return <PublicLayout />;
  }

  if (currentUser.roles.includes("Employer")) {
    return <EmployerLayout />;
  }

  return <AppLayout />;
}
