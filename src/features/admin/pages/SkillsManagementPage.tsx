"use client";

import { useState, useCallback } from "react";
import { SkillsHeader } from "../skills/components/SkillsHeader";
import { Filters } from "../skills/components/Filters";
import { SkillsTable } from "../skills/components/SkillsTable";
import { AddSkillDialog } from "../skills/dialogs/AddSkillDialog";
import { EditSkillDialog } from "../skills/dialogs/EditSkillDialog";
import ShowSkillInfoDialog from "../skills/dialogs/ShowSkillInfoDialog";
import { useSkills } from "../hooks/useSkills";
import { useSkillsFilters } from "../hooks/useSkillsFilter";
import type { skillManagement } from "../skills/skillsTypes";

export default function SkillsManagement() {
  const { skills, deleteSkill } = useSkills();
  const { searchTerm, setSearchTerm, sort, setSort, page, setPage } =
    useSkillsFilters();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<skillManagement | null>(
    null
  );

  const [isShowSkillDialogOpen, setIsShowSkillDialogOpen] = useState(false);
  const [showSkill, setShowSkill] = useState<skillManagement | null>(null);

  const handleEditSkill = useCallback((skill: skillManagement) => {
    setEditingSkill(skill);
    setIsEditDialogOpen(true);
  }, []);

  const handleShowSkill = useCallback((skill: skillManagement) => {
    setShowSkill(skill);
    setIsShowSkillDialogOpen(true);
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <SkillsHeader onAddClick={() => setIsAddDialogOpen(true)} />

      <Filters
        sort={sort}
        value={searchTerm}
        onSearchChange={setSearchTerm}
        onSortChange={setSort}
        placeholder="Search skills..."
      />

      <SkillsTable
        skills={skills}
        searchTerm={searchTerm}
        onEditSkill={handleEditSkill}
        onDeleteSkill={deleteSkill}
        onPageChange={setPage}
        onShowInfoSkill={handleShowSkill}
      />

      <AddSkillDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />

      <EditSkillDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        skill={editingSkill}
      />

      <ShowSkillInfoDialog
        open={isShowSkillDialogOpen}
        skill={showSkill}
        onClose={() => setIsShowSkillDialogOpen(false)}
      />
    </div>
  );
}
