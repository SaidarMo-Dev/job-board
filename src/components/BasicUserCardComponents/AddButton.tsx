import { Button } from "../ui/button";

interface AddButtonProps {
  field: string;
  onClick?: () => void;
}
export default function AddButton({ field, onClick }: AddButtonProps) {
  return (
    <div
      className="h-auto py-2 px-3 justify-start text-sky-600
        hover:text-sky-700 hover:bg-sky-50  w-full rounded-md
          cursor-pointer mt-2"
      onClick={onClick}
    >
      <Button
        variant="ghost"
        size="sm"
        className="text-sky-600 p-0 h-auto cursor-pointer 
        hover:text-sky-700 hover:bg-sky-50"
      >
        + Add {field}
      </Button>
    </div>
  );
}
