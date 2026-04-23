import { Pen } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { BaseCompanyComponentsProps } from "../types/baseCompanyComponentsType";
import ViewOrEditField from "./ViewOrEditField";
import { type CompanyFormValues } from "../schemas/companySchema";
import { Controller, useFormContext } from "react-hook-form";
import { MultiSelectCombobox } from "@/shared/components/MultiSelectCombobox";
import { usePaginatedIndustries } from "@/features/industry/hooks/usePaginatedIndustries";
import { useEmployerCompanyQuery } from "../../hooks/useEmployerCompanyQuery";
import { Badge } from "@/components/ui/badge";
import ErrorField from "@/shared/components/ErrorField";

export function CompanyGeneralInformation({
  isEditing,
  setIsEditing,
}: BaseCompanyComponentsProps) {
  const {
    register,
    watch,
    control,
    formState: { errors },
  } = useFormContext<CompanyFormValues>();

  const { industries, loadMore, hasMore, loading } = usePaginatedIndustries();
  // Call watch once for all fields in this section
  const [name, slug, foundedYear, companySize] = watch([
    "companyName",
    "slug",
    "foundedYear",
    "companySize",
  ]);

  const { data: company } = useEmployerCompanyQuery();

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold text-foreground">
          General Information
        </h2>
        <button
          type="button"
          className="text-muted-foreground hover:text-primary transition-colors"
          onClick={() => setIsEditing?.(true)}
        >
          <Pen className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Company Name */}
        <div className="space-y-1.5">
          <ViewOrEditField
            label="Company Name"
            value={name}
            isEditing={isEditing}
          >
            <div className="space-y-1.5">
              <Input
                {...register("companyName")}
                type="text"
                placeholder="Enter company name..."
                className="rounded-xl"
              />
              {errors.companyName && (
                <ErrorField message={errors.companyName.message} />
              )}
            </div>
          </ViewOrEditField>
        </div>

        {/* Company Slug */}
        <div className="space-y-1.5">
          <ViewOrEditField
            label="Company Slug"
            value={`/${slug}`}
            isEditing={isEditing}
          >
            <div className="space-y-1.5">
              <Input
                {...register("slug")}
                type="text"
                placeholder="unique value..."
                className="rounded-xl"
              />
              {errors.slug && <ErrorField message={errors.slug.message} />}
            </div>
          </ViewOrEditField>
        </div>
        {/* Size */}

        <ViewOrEditField label="Size" value={companySize} isEditing={isEditing}>
          <Controller
            name="companySize"
            control={control}
            render={({ field, fieldState }) => (
              <div className="space-y-1.5">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="rounded-xl w-[180px]">
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Small">Small</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Large">Large</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.error && (
                  <ErrorField message={fieldState.error.message} />
                )}
              </div>
            )}
          />
        </ViewOrEditField>

        {/* Founded year */}
        <ViewOrEditField
          label="Founded Year"
          value={foundedYear}
          isEditing={isEditing}
        >
          <div className="space-y-1.5">
            <Input
              {...register("foundedYear")}
              type="text"
              defaultValue="2018"
              className="rounded-xl"
            />
            {errors.foundedYear && (
              <ErrorField message={errors.foundedYear.message} />
            )}
          </div>
        </ViewOrEditField>

        {/* Industry Section */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Industry
          </label>

          {isEditing ? (
            <Controller
              name="industryIds"
              control={control}
              render={({ field, fieldState }) => (
                <div className="space-y-1">
                  <MultiSelectCombobox
                    options={industries ?? []}
                    selected={field.value ?? []}
                    onChange={field.onChange}
                    loadMore={loadMore}
                    hasMore={hasMore}
                    loading={loading}
                    placeholder="Select industries..."
                  />
                  {/* Validation Error Message */}
                  {fieldState.error && (
                    <ErrorField message={fieldState.error.message} />
                  )}
                </div>
              )}
            />
          ) : (
            /* Read-only view with flex-wrap for multiple badges */
            <div className="flex flex-wrap gap-1.5">
              {company?.industries?.length ? (
                company.industries.map((industry) => (
                  <Badge key={industry.id} variant="secondary">
                    {industry.name}
                  </Badge>
                ))
              ) : (
                <span className="text-sm italic text-muted-foreground ml-1">
                  No industries specified
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
