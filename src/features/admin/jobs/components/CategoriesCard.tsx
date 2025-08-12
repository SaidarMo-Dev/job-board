"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tags } from "lucide-react";
import type { Option } from "../jobsType";
import { MultiSelectCombobox } from "./MultiSelectCombobox";
import { AddCategoryDialog } from "../dialogs/AddCategoryDialog";
import { Controller, type Control } from "react-hook-form";
import type { JobFormValues } from "../schemas/jobSchema";

export function CategoriesCard({
  options,
  control,
  onCreate,
  error,
  max = 5,
}: {
  options: Option[];
  control: Control<JobFormValues>;
  onCreate: (label: string) => void;
  error?: string;
  max?: number;
}) {
  return (
    <Card className="rounded-2xl shadow-sm bg-white dark:bg-secondary">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Tags className="h-5 w-5" />
          Categories
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-3" data-error={!!error}>
        <Controller
          name="categoryIds"
          control={control}
          render={({ field }) => (
            <>
              <MultiSelectCombobox
                options={options}
                selected={field.value}
                onChange={field.onChange}
                placeholder={`Select up to ${max} categories...`}
                max={max}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </>
          )}
        />
        <AddCategoryDialog onCreate={onCreate} />
      </CardContent>
    </Card>
  );
}
