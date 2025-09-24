import Loader from "@/components/Loaders/Loader";
import { Button } from "@/components/ui/button";

interface AddJobHeaderProps {
  onClose: () => void;
  loading: boolean;
}
export default function AddJobHeader({ onClose, loading }: AddJobHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Post a new job</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" type="button" onClick={() => onClose()}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              Save Job
              {loading && (
                <Loader variant="dots" size="sm" color="text-white" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
