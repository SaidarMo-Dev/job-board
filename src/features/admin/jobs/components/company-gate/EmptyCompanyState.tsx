import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, Plus } from "lucide-react";

export default function EmptyCompanyState({
  onCreate,
}: {
  onCreate?: () => void;
}) {
  return (
    <Card className="p-8 border-2 border-dashed border-muted">
      <div className="flex gap-8 items-center">
        {/* Empty State Icon */}
        <div className="flex-shrink-0">
          <div className="h-32 w-32 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
            <Building2 className="h-16 w-16 text-muted-foreground/50" />
          </div>
        </div>

        {/* Empty State Content */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-2">
            You don&apos;t have a company yet
          </h3>
          <p className="text-muted-foreground mb-6">
            Create your company to start posting jobs and manage your
            applications.
          </p>
          <Button
            type="button"
            size="lg"
            onClick={() => onCreate?.()}
            className="gap-2 bg-foreground text-background hover:bg-foreground/90"
          >
            <Plus className="h-5 w-5" />
            Create Company
          </Button>
        </div>

        {/* Background Illustration */}
        {/* <div className="flex-shrink-0 hidden lg:block opacity-50">
          <BuildingIllustration />
        </div> */}
      </div>
    </Card>
  );
}
