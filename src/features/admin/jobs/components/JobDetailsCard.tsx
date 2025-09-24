"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { Briefcase, MapPin } from "lucide-react";
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import type { JobFormValues } from "../schemas/jobSchema";

interface JobDetailsCardProps {
  register: UseFormRegister<JobFormValues>;
  control: Control<JobFormValues>;
  errors?: FieldErrors<JobFormValues>;
}

export function JobDetailsCard({
  register,
  control,
  errors,
}: JobDetailsCardProps) {
  return (
    <Card className="rounded-2xl shadow-sm bg-white dark:bg-secondary">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Job Details
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 p-6">
        <div className="space-y-2" data-error={!!errors?.title}>
          <label className="text-sm font-medium" htmlFor="job-title">
            Job Title <span className="text-destructive">*</span>
          </label>
          <Input
            {...register("title")}
            id="job-title"
            placeholder="e.g. Senior Frontend Engineer"
            className="bg-white dark:bg-secondary"
          />
          {errors?.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2" data-error={!!errors?.description}>
          <label className="text-sm font-medium" htmlFor="job-description">
            Job Description <span className="text-destructive">*</span>
          </label>
          <Textarea
            {...register("description")}
            id="job-description"
            placeholder="Describe the role, responsibilities, and requirements..."
            rows={6}
            className="bg-white dark:bg-secondary"
          />
          {errors?.description && (
            <p className="text-sm text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="space-y-2" data-error={!!errors?.location}>
          <label className="text-sm font-medium" htmlFor="job-location">
            Location <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <Input
              {...register("location")}
              id="job-location"
              placeholder="e.g. New York, NY or Remote (US)"
              className="bg-white dark:bg-secondary pl-9"
            />
            <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          {errors?.location && (
            <p className="text-sm text-destructive">
              {errors.location.message}
            </p>
          )}
        </div>
        {/* salary range  */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Salary Range</label>
          <div className="grid grid-cols-3 gap-2">
            <Input
              {...register("minSalary", { valueAsNumber: true })}
              type="number"
              inputMode="numeric"
              placeholder="Min"
              className="bg-white dark:bg-secondary"
            />
            <Input
              {...register("maxSalary", { valueAsNumber: true })}
              type="number"
              inputMode="numeric"
              placeholder="Max"
              className="bg-white dark:bg-secondary"
            />
          </div>
        </div>

        {/* Job Type */}
        <Controller
          name="jobType"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="job-type">
                Job Type
              </label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="job-type"
                  className="bg-white dark:bg-secondary"
                >
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FullTime">Full-time</SelectItem>
                  <SelectItem value="PartTime">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Freelance">FreeLance</SelectItem>
                </SelectContent>
              </Select>
              {errors?.jobType && (
                <p className="text-sm text-destructive">
                  {errors.jobType.message}
                </p>
              )}
            </div>
          )}
        />

        {/* Experience */}

        <Controller
          name="experienceLevel"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="experience">
                Experience Level
              </label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="experience"
                  className="bg-white dark:bg-secondary"
                >
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Any">Any</SelectItem>
                  <SelectItem value="EntryLevel">Entry</SelectItem>
                  <SelectItem value="MidLevel">Mid</SelectItem>
                  <SelectItem value="SeniorLevel">Senior</SelectItem>
                  <SelectItem value="LeadPrincipal">Lead Principal</SelectItem>
                </SelectContent>
              </Select>
              {errors?.experienceLevel && (
                <p className="text-sm text-destructive">
                  {errors.experienceLevel.message}
                </p>
              )}
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
}
