import { Button } from "../ui/button";

export default function AddButton({ field }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-sky-600 p-0 h-auto cursor-pointer"
    >
      + Add {field}
    </Button>
  );
}
