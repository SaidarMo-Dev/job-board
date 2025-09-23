"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tags } from "lucide-react";
import { MultiSelectCombobox } from "./MultiSelectCombobox";
import { AddCategoryDialog } from "../dialogs/AddCategoryDialog";
import { Controller, type Control } from "react-hook-form";
import type { JobFormValues } from "../schemas/jobSchema";
import { usePaginatedCategories } from "../../hooks/usePaginatedCategories";
import { DEFAULT_PAGE_SIZE } from "@/constants/config";
import type { Option } from "../jobsType";

export function CategoriesCard({
  control,
  onCreate,
  error,
  max = 5,
}: {
  control: Control<JobFormValues>;
  onCreate: (option: Option) => void;
  error?: string;
  max?: number;
}) {
  const { categories, setCategories, loadMore, loading, hasMore } =
    usePaginatedCategories(DEFAULT_PAGE_SIZE);

  const handleCreate = (option: Option) => {
    setCategories((prev) => [...prev, option]);
    onCreate(option);
  };
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
                options={categories ?? []}
                selected={field.value ?? []}
                onChange={field.onChange}
                loadMore={loadMore}
                hasMore={hasMore}
                loading={loading}
                placeholder={`Select up to ${max} categories...`}
                max={max}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </>
          )}
        />
        <AddCategoryDialog onCreate={handleCreate} />
      </CardContent>
    </Card>
  );
}
