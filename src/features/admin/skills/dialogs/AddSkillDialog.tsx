"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { addSkillThunk } from "../skillsThunk";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { toast } from "react-toastify";
import { useAppSelector } from "@/hooks/useAppSelector";

interface AddEditSkillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddSkillDialog({
  open,
  onOpenChange,
}: AddEditSkillDialogProps) {
  const [skillName, setSkillName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useAppDispatch();

  const loading = useAppSelector(
    (state) => state.adminSkillsReducer.loading.save
  );

  const handleSubmit = async () => {
    if (skillName.trim()) {
      const result = await dispatch(
        addSkillThunk({ skill: { name: skillName, description: description } })
      );

      if (addSkillThunk.fulfilled.match(result)) {
        toast.success("Added Successfully");

        setSkillName("");
        setDescription("");
        onOpenChange(false);
      } else {
        toast.error(result.payload);
      }
    }
  };

  const handleCancel = () => {
    setSkillName("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Skill</DialogTitle>
          <DialogDescription>
            Enter the name of the skill you want to add to your portfolio.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="skill-name">Skill Name</Label>
            <Input
              id="skill-name"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              placeholder="e.g., JavaScript, Python, Design..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skill-name">Skill Description</Label>
            <Textarea
              id="skill-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!skillName.trim()}
            className="bg-sky-600 hover:bg-sky-700 dark:bg-secondary-foreground"
          >
            {loading ? "Adding..." : "Add Skill"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
