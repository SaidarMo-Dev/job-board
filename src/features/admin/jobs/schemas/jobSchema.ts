import { jobExperiences, jobTypes } from "@/features/jobs/jobTypes";
import { z } from "zod";

export const JobSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: "Title is required" })
      .max(50, { message: "Title cannot exceed 50 characters" }),

    description: z
      .string()
      .max(2000, "Description cannot exceed 2000 characters")
      .optional(),

    companyId: z.coerce.number({ invalid_type_error: "Company is required" }),

    location: z
      .string()
      .min(1, { message: "Location is required" })
      .max(100, { message: "Location cannot exceed 100 characters" }),

    jobType: z.enum(jobTypes, { required_error: "Select job type!" }),

    experienceLevel: z.enum(jobExperiences, {
      required_error: "Select experience!",
    }),

    minSalary: z.coerce.number({
      invalid_type_error: "Minimum salary must be a number",
    }),
    maxSalary: z.coerce.number({
      invalid_type_error: "Maximum salary must be a number",
    }),
    dateExpired: z.coerce
      .date({
        required_error: "Expiration date is required",
        invalid_type_error: "Invalid date",
      })
      .refine(
        (date) => {
          const today = new Date();
          const minDate = new Date(today.setDate(today.getDate() + 7));
          return date >= minDate;
        },
        {
          message: "Expiration date must be at least 7 days from today",
        },
      ),
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
