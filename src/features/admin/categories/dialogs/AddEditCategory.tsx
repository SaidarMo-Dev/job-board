import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CategoryManagement, categoryMode } from "../categoryTypes";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectSaveCategoryLoading } from "../categorySlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addCategoryThunk, updateCategoryThunk } from "../categoryThunk";
import { toast } from "react-toastify";

interface AddEditCategoryProps {
  open: boolean;
  mode: categoryMode;
  category: CategoryManagement | null;
  onClose?: () => void;
}
export default function AddEditCategory({
  open,
  mode = "AddNew",
  category,
  onClose,
}: AddEditCategoryProps) {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const loading = useAppSelector(selectSaveCategoryLoading);

  useEffect(() => {
    if (category) {
      setFormData({ description: category.description, name: category.name });
    } else {
      setFormData({ name: "", description: "" });
    }
  }, [category]);

  const handleClose = () => {
    if (onClose) onClose();
  };

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === "AddNew") {
      // handle add category
      const res = await dispatch(
        addCategoryThunk({
          category: { name: formData.name, description: formData.description },
        })
      );

      if (addCategoryThunk.fulfilled.match(res)) {
        toast.success("Added successfully", { position: "bottom-left" });
        onClose?.();
      } else {
        toast.error(res.payload);
      }
    } else {
      // handle update category
      const res = await dispatch(
        updateCategoryThunk({
          category: {
            categoryId: category?.categoryId ?? -1,
            name: formData.name,
            description: formData.description,
          },
        })
      );

      if (updateCategoryThunk.fulfilled.match(res)) {
        toast.success("Updated successfully", { position: "bottom-left" });
        onClose?.();
      } else {
        toast.error(res.payload);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode == "AddNew" ? "Add category" : "Update catgory"}
          </DialogTitle>
          <DialogDescription>
            {mode == "AddNew"
              ? "Create a new job category. Fill in the details below."
              : "Update the category information below."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="e.g., Software Development"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Brief description of this category..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !formData.name.trim()} className="bg-sky-600">
              {loading ? "Saving..." : mode == "AddNew" ? "Create" : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
