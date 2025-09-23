"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkIcon } from "lucide-react";
import type { Option } from "../jobsType";
import { MultiSelectCombobox } from "./MultiSelectCombobox";
import { AddSkillDialog } from "../dialogs/AddSkillDialog";
import { Controller, type Control } from "react-hook-form";
import type { JobFormValues } from "../schemas/jobSchema";
import { usePaginatedSkills } from "../../hooks/usePaginatedSkills";
import { DEFAULT_PAGE_SIZE } from "@/constants/config";

export function SkillsCard({
  control,
  onCreate,
  error,
}: {
  control: Control<JobFormValues>;
  onCreate: (option: Option) => void;
  error?: string;
  max?: number;
}) {
  const { skills, setSkills, loadMore, loading, hasMore } =
    usePaginatedSkills(DEFAULT_PAGE_SIZE);

  const handleCreate = (option: Option) => {
    setSkills((prev) => [...prev, option]);
    onCreate(option);
  };
  return (
    <Card className="rounded-2xl shadow-sm bg-white dark:bg-secondary">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <LinkIcon className="h-5 w-5" />
          Skills
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-3" data-error={!!error}>
        <Controller
          name="skillIds"
          control={control}
          render={({ field }) => (
            <>
              <MultiSelectCombobox
                options={skills}
                selected={field.value ?? []}
                onChange={field.onChange}
                loadMore={loadMore}
                hasMore={hasMore}
                loading={loading}
                placeholder={`Select skills...`}
                counterLabel={`${
                  field.value ? field.value.length : "0"
                } selected`}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </>
          )}
        />
        <AddSkillDialog onCreate={handleCreate} />
      </CardContent>
    </Card>
  );
}
