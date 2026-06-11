import { selectCurrentUser } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getDashboardRoute } from "../utils/getDashboardRoute";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";

export function DashboardButton() {
  const user = useAppSelector(selectCurrentUser);
  return (
    <Button className="flex items-center justify-center gap-2 py-4! px-3! text-sm" asChild>
      <Link to={getDashboardRoute(user?.roles)}>
        <LayoutDashboard /> Dashboard
      </Link>
    </Button>
  );
}
