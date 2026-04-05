import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Plus } from "lucide-react";
import { Link } from "react-router";

export default function DashboardHeader({ className }: { className?: string }) {
  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between py-4">
        <div>
          <h1 className="text-xl font-semibold text-balance">Jobs</h1>
          <p className="text-sm text-muted-foreground">
            Manage your active recruitement piplines listings.
          </p>
        </div>
        <Link to={ROUTES.EMPLOYER.JOBS.ADD}>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Post a Job
          </Button>
        </Link>
      </div>
    </div>
  );
}
