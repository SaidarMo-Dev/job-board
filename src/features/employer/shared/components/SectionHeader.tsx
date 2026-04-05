import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router";

interface SectionHeaderProps {
  title?: string;
  description?: string;
  to: string;
  className?: string;
}

export default function SectionHeader({
  title = "Title",
  description = "description",
  to,
  className,
}: SectionHeaderProps) {
  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between py-4">
        <div>
          <h1 className="text-xl font-semibold text-balance">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Link to={to}>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Post a Job
          </Button>
        </Link>
      </div>
    </div>
  );
}
