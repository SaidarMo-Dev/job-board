import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CategoriesHeaderProps {
  onAddCategory: () => void;
}
export default function CategoriesHeader({
  onAddCategory,
}: CategoriesHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Job Categories</h1>
        <p className="text-muted-foreground">
          Manage and organize job categories for your platform
        </p>
      </div>
      <Button onClick={() => onAddCategory()}>
        <Plus className="mr-2 h-4 w-4" />
        Add Category
      </Button>
    </div>
  );
}
