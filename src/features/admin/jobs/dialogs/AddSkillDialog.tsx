"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

export function AddSkillDialog({
  onCreate,
  triggerLabel = "Add New Skill",
}: {
  onCreate: (label: string) => void;
  triggerLabel?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [label, setLabel] = React.useState("");

  const handleSave = () => {};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="secondary">
          <Plus className="h-4 w-4 mr-1.5" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Skill</DialogTitle>
          <DialogDescription>
            Add a new skill and select it for this job.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-2">
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="new-skill">
              Skill name
            </label>
            <Input
              id="new-skill"
              placeholder="e.g. GraphQL"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={!label.trim()}>
            Save Skill
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
