import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Search, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function WelcomeHero() {
  const currentUser = useAppSelector(selectCurrentUser);

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 18
      ? "Good afternoon"
      : "Good evening";

  return (
    <Card className="mt-5 bg-gray-50 border-gray-200">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {greeting}, {currentUser?.firstName + " " + currentUser?.lastName}{" "}
              👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Ready to find your next opportunity? Let's discover jobs that
              match your skills and preferences.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link to={ROUTES.PUBLIC.JOBS} className="flex gap-2">
                <Search className="h-4 w-4" />
                Discover More Jobs
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
