import { jobExperiences, jobTypes } from "@/features/jobs/jobTypes";
import { z } from "zod";

export const JobSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: "Title is required" })
      .max(50, { message: "Title cannot exceed 50 characters" }),

    description: z.string().optional(),

    companyId: z.number({ invalid_type_error: "Company is required" }),

    location: z
      .string()
      .min(1, { message: "Location is required" })
      .max(100, { message: "Location cannot exceed 100 characters" }),

    jobType: z.enum(jobTypes, { required_error: "Select job type!" }),

    experienceLevel: z.enum(jobExperiences, {
      required_error: "Select experience!",
    }),

    minSalary: z.number({
      invalid_type_error: "Minimum salary must be a number",
    }),
    maxSalary: z.number({
      invalid_type_error: "Maximum salary must be a number",
    }),

    skillIds: z
      .array(z.number())
      .min(1, { message: "Select at least one skill" }),
    categoryIds: z
      .array(z.number())
      .min(1, { message: "Select at least one category" }),
      
  })
  .refine((data) => data.maxSalary >= data.minSalary, {
    message: "Max salary must be greater than or equal to min salary",
    path: ["maxSalary"],
  });

export type JobFormValues = z.infer<typeof JobSchema>;
