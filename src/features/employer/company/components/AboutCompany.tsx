"use client";

import { Pen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import type { CompanyFormValues } from "../schemas/companySchema";
import ViewOrEditField from "./ViewOrEditField";
import ErrorField from "@/shared/components/ErrorField";
import type { BaseCompanyComponentsProps } from "../types/baseCompanyComponentsType";

export function AboutCompany({
  isEditing,
  setIsEditing,
}: BaseCompanyComponentsProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<CompanyFormValues>();

  const [description, shortDescription] = watch([
    "description",
    "shortDescription",
  ]);
  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold text-foreground">About Company</h2>
        <button
          type="button"
          className="text-muted-foreground hover:text-primary transition-colors"
          onClick={() => setIsEditing?.(true)}
        >
          <Pen className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-5">
        {/* Short Description */}
        <div className="space-y-1.5">
          <ViewOrEditField
            label="Short Description (Tagline)"
            value={shortDescription}
            isEditing={isEditing}
          >
            <div className="space-y-1.5">
              <Input
                {...register("shortDescription")}
                type="text"
                placeholder="Short Description..."
                className="rounded-xl"
              />
              {errors.shortDescription && (
                <ErrorField message={errors.shortDescription.message} />
              )}
            </div>
          </ViewOrEditField>
        </div>

        {/* Long Description */}
        <div className="space-y-1.5">
          <ViewOrEditField
            label="Long Description"
            value={description}
            isEditing={isEditing}
          >
            <div className="space-y-1.5">
              <Textarea
                {...register("description")}
                rows={4}
                placeholder="Long Description..."
                className="rounded-xl resize-none"
              />
              {errors.description && (
                <ErrorField message={errors.description.message} />
              )}
            </div>
          </ViewOrEditField>
        </div>
      </div>
    </div>
  );
}
