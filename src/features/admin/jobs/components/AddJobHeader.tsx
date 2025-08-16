import { Button } from "@/components/ui/button";

interface AddJobHeaderProps {
  onClose: () => void;
  onSave: () => void;
}
export default function AddJobHeader({ onClose, onSave }: AddJobHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Post a new job</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => onClose()}>
              Cancel
            </Button>
            <Button onClick={onSave}>Save Job</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
