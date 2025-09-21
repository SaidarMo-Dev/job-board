"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import type { CompanyOption } from "../jobsType";
import { CompanyCombobox } from "./CompanyCombobox";
import { AddCompanyDialog } from "../../companies/dialogs/AddCompanyDialog";
import { Controller, type Control } from "react-hook-form";
import type { JobFormValues } from "../schemas/jobSchema";

export function CompanyCard({
  control,
  onCreate,
  error,
}: {
  control: Control<JobFormValues>;
  onCreate: (company: CompanyOption) => void;
  error?: string;
}) {
  return (
    <Card className="rounded-2xl shadow-sm bg-white dark:bg-secondary">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Company
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-3" data-error={!!error}>
        <Controller
          name="companyId"
          control={control}
          render={({ field }) => (
            <>
              <CompanyCombobox
                value={field.value}
                onChange={field.onChange}
                placeholder="Select a company..."
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </>
          )}
        />
        <AddCompanyDialog onCreate={onCreate} />
      </CardContent>
    </Card>
  );
}
