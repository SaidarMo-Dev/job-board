import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Briefcase, Plus } from "lucide-react";
import { Link } from "react-router";

export default function RecruitmentHeader() {
  return (
    <div>
      <div className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-balance">
                Track Your Jobs
              </h1>
              <p className="text-sm text-muted-foreground">
                Employer Dashboard
              </p>
            </div>
          </div>
          <Link to={ROUTES.MEMBER.RECRUITMENT.JOBS.ADD}>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Post New Job
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
