import { Button } from "../ui/button";

export default function AddButton({ field }) {
  return (
    <div className="h-auto py-2 px-3 justify-start text-sky-600 hover:text-sky-700 hover:bg-sky-50 border border-dashed border-gray-300 w-full rounded-md cursor-pointer">
      <Button
        variant="ghost"
        size="sm"
        className="text-sky-600 p-0 h-auto cursor-pointer"
      >
        + Add {field}
      </Button>
    </div>
  );
}
