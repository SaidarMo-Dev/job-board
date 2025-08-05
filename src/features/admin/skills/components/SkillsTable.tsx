"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Edit, Eye } from "lucide-react";
import { DeleteSkillDialog } from "../dialogs/DeleteSkillDialog";
import type { skillManagement } from "../skillsTypes";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectFetchLoading } from "../skillsSlice";
import Loader from "@/components/Loaders/Loader";
import TablePagination from "../../users/components/TablePagination";

interface SkillsTableProps {
  skills: skillManagement[] | null;
  searchTerm: string;
  onEditSkill: (skill: skillManagement) => void;
  onDeleteSkill: (skillId: number) => void;
  onPageChange: (page: number) => void;
  onShowInfoSkill: (skill: skillManagement) => void;
}

export function SkillsTable({
  skills,
  searchTerm,
  onEditSkill,
  onDeleteSkill,
  onShowInfoSkill,
  onPageChange,
}: SkillsTableProps) {
  const loading = useAppSelector(selectFetchLoading);
  const pagination = useAppSelector(
    (state) => state.adminSkillsReducer.pagination
  );

  const formatDescription = (value: string | undefined): string => {
    if (!value) return "Not Specified";
    const result = value.split(" ");

    if (result.length > 4) return result.slice(0, 4).join(" ") + "...";
    return value;
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Skill ID</TableHead>
              <TableHead>Skill Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Added Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Loader variant="spinner" size="sm" className="m-auto" />
                </TableCell>
              </TableRow>
            ) : skills === null || skills.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  {searchTerm
                    ? "No skills found matching your search."
                    : "No skills added yet."}
                </TableCell>
              </TableRow>
            ) : (
              skills.map((skill) => (
                <TableRow key={skill.id}>
                  <TableCell className="font-medium">#{skill.id}</TableCell>
                  <TableCell className="font-medium">{skill.name}</TableCell>
                  <TableCell className="font-medium">
                    {formatDescription(skill.description)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {skill.createDate}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onShowInfoSkill(skill)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Show Info</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEditSkill(skill)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit skill</span>
                      </Button>
                      <DeleteSkillDialog
                        skillName={skill.name}
                        onDelete={() => onDeleteSkill(skill.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {skills && skills.length > 10 && (
          <TablePagination
            paginationInfo={pagination}
            onPageChange={(page) => onPageChange(page)}
          />
        )}
      </div>
    </>
  );
}
