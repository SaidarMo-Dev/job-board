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
import type { Option } from "../jobsType";
import { extractAxiosErrorMessage } from "@/utils/apiErrorHandler";
import { addSkill } from "../../skills/skillsApi";
import Loader from "@/components/Loaders/Loader";
import InlineError from "@/components/InlineError";

export function AddSkillDialog({
  onCreate,
  triggerLabel = "Add New Skill",
}: {
  onCreate: (option: Option) => void;
  triggerLabel?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSave = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      const res = await addSkill({ name: name });
      onCreate({ id: res.data, name: name });
      setName("");
      setError("");
      setOpen(false);
      return;
    } catch (err) {
      setError(extractAxiosErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

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
          {error && <InlineError message={error} />}
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleSave}
            disabled={!name.trim()}
            className="flex items-center justify-center gap-2"
          >
            Save Skill
            {loading && <Loader variant="dots" size="sm" color="text-white" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
