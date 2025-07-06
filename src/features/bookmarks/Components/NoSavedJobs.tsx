import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Link } from "react-router";

export default function NoSavedJobs() {
  return (
    <div className="text-center py-12">
      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-2">No saved jobs yet</h3>
      <p className="text-muted-foreground mb-4">
        Start browsing jobs and save the ones you're interested in
      </p>
      <Link to={"/jobs"}>
        <Button className="bg-sky-600 text-white cursor-pointer hover:bg-sky-700">
          Browse Jobs
        </Button>
      </Link>
    </div>
  );
}
