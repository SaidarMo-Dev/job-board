"use client";

import { useState, useEffect } from "react";
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
import type { skillManagement } from "../skillsTypes";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { updateSkillThunk } from "../skillsThunk";
import { toast } from "react-toastify";
import { useAppSelector } from "@/hooks/useAppSelector";

interface EditSkillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skill: skillManagement | null;
}

export function EditSkillDialog({
  open,
  onOpenChange,
  skill,
}: EditSkillDialogProps) {
  const [skillName, setSkillName] = useState(skill?.name ?? "");
  const [skillDescription, setSkillDescription] = useState(
    skill?.description ?? ""
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (skill) {
      setSkillName(skill.name);
      setSkillDescription(skill.description ?? "");
    }
  }, [skill]);

  const loading = useAppSelector(
    (state) => state.adminSkillsReducer.loading.save
  );

  const handleSubmit = async () => {
    if (skill && skillName.trim()) {
      const result = await dispatch(
        updateSkillThunk({
          skill: {
            skillId: skill.id,
            name: skillName,
            description: skillDescription,
          },
        })
      );

      if (updateSkillThunk.fulfilled.match(result)) {
        toast.success("Updated successfully");
        setSkillName("");
        setSkillDescription("");
        onOpenChange(false);
      } else {
        toast.error(result.payload);
      }
    }
  };

  const handleCancel = () => {
    setSkillName(skill?.name || "");
    setSkillDescription(skill?.description || "");
    onOpenChange(false);
  };

  if (!skill) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Skill</DialogTitle>
          <DialogDescription>Update the name of your skill.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-skill-name">Skill Name</Label>
            <Input
              id="edit-skill-name"
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
          <div className="grid gap-2">
            <Label htmlFor="edit-skill-name">Skill Description</Label>
            <Textarea
              id="edit-skill-description"
              value={skillDescription}
              onChange={(e) => setSkillDescription(e.target.value)}
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
            className="bg-sky-600 hover:bg-sky-700 dark:bg-foreground dark:hover:bg-gray-200"
            onClick={handleSubmit}
            disabled={!skillName.trim() || loading}
          >
            {loading ? "Updating..." : "Update Skill"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
