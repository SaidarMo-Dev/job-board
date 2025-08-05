"use client";

import { useEffect, useState } from "react";
import { SkillsHeader } from "../skills/components/SkillsHeader";
import { Filters } from "../skills/components/Filters";
import { SkillsTable } from "../skills/components/SkillsTable";
import { AddSkillDialog } from "../skills/dialogs/AddSkillDialog";
import { EditSkillDialog } from "../skills/dialogs/EditSkillDialog";
import { useSkills } from "../hooks/useSkills";
import type { skillManagement, SortSkill } from "../skills/skillsTypes";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchSkillsThunk } from "../skills/skillsThunk";
import { useSearchParams } from "react-router";
import useDebounce from "@/hooks/use-debounce";
import ShowSkillInfoDialog from "../skills/dialogs/ShowSkillInfoDialog";

export default function SkillsManagement() {
  const { skills, deleteSkill } = useSkills();

  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState<SortSkill>("CreateDate");
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<skillManagement | null>(
    null
  );

  const [ShowSkill, setShowSkill] = useState<skillManagement | null>(null);
  const [isShowSkillDialogOpen, setIsShowSkillDialogOpen] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 500);

  // clean filters
  const cleanFilterParams = () => {
    const params = new URLSearchParams();

    // add non default values
    if (debouncedSearch) params.set("Search", debouncedSearch);

    if (searchTerm) params.set("Search", searchTerm);
    if (sort && sort !== "CreateDate") params.set("SortBy", sort);

    if (page && page > 1) params.set("Page", page.toString());

    return params;
  };

  // update url that displayed to the user
  useEffect(() => {
    const params = cleanFilterParams();
    setSearchParams(params);
  }, [debouncedSearch, page, sort]);

  //fetch users
  useEffect(() => {
    dispatch(
      fetchSkillsThunk({ page, size: 10, search: debouncedSearch, sort })
    );
  }, [dispatch, page, debouncedSearch, sort]);

  const handleEditSkill = (skill: skillManagement) => {
    setEditingSkill(skill);
    setIsEditDialogOpen(true);
  };

  const handleShowSkill = (skill: skillManagement) => {
    setShowSkill(skill);
    setIsShowSkillDialogOpen(true);
  };
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-4">
        <SkillsHeader onAddClick={() => setIsAddDialogOpen(true)} />

        <div className="flex items-center space-x-2">
          <Filters
            sort={sort}
            value={searchTerm}
            onSearchChange={setSearchTerm}
            onSortChange={setSort}
            placeholder="Search skills..."
          />
        </div>
      </div>

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
        skill={ShowSkill}
        onClose={() => setIsShowSkillDialogOpen(false)}
      />
    </div>
  );
}
