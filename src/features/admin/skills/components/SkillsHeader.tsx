"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface SkillsHeaderProps {
  onAddClick: () => void;
}

export function SkillsHeader({ onAddClick }: SkillsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Skills Management</h1>
        <p className="text-muted-foreground">
          Manage and organize your skills portfolio
        </p>
      </div>
      <Button
        className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 dark:bg-foreground dark:hover:bg-gray-200"
        onClick={onAddClick}
      >
        <Plus className="h-4 w-4" />
        Add Skill
      </Button>
    </div>
  );
}
