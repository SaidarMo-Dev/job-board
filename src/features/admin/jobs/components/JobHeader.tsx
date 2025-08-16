import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Plus } from "lucide-react";
import { Link } from "react-router";

export default function JobHeader({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Jobs</h1>
        <p className="text-muted-foreground">
          Manage job postings and applications
        </p>
      </div>
      <Button asChild onClick={onCreate}>
        <Link to={ROUTES.ADMIN.JOBS.ADD}>
          <Plus className="h-4 w-4 mr-2" />
          Create Job
        </Link>
      </Button>
    </div>
  );
}
