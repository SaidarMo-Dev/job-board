import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Plus } from "lucide-react";
import { Link } from "react-router";

interface CompaniesHeaderProps {
  onAddCompany: () => void;
}

export default function CompaniesHeader({
  onAddCompany,
}: CompaniesHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Company Directory</h1>
        <p className="text-muted-foreground">
          Manage your company listings and job opportunities
        </p>
      </div>
      <Link to={ROUTES.ADMIN.COMPANIES.ADD}>
        <Button onClick={() => onAddCompany()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Company
        </Button>
      </Link>
    </div>
  );
}
