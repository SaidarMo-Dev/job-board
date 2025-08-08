import { z } from "zod";

export const CompanySchema = z.object({
  companyName: z
    .string()
    .min(1, { message: "Company Name is required" })
    .max(30, { message: "Company Name cannot exceed 30 characters" }),

  industry: z
    .string()
    .min(1, { message: "Industry is required" })
    .max(30, { message: "Industry cannot exceed 30 characters" }),

  description: z
    .string()
    .max(1000, { message: "You cannot add more than 1000 characters" }),

  websiteUrl: z.string().url({ message: "Invalid URL format" }).optional(),

  location: z
    .string()
    .min(1, { message: "Location is required" })
    .max(50, { message: "Location cannot exceed 50 characters" }),

  phoneNumber: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^\+?[0-9\s\-()]{7,20}$/, {
      message: "Invalid phone number format (e.g. +1 234-567-8901)",
    })
    .transform((val) => val.replace(/[^\d+]/g, ""))
    .optional(), // remove spaces, dashes, parentheses

  email: z.string().email({ message: "Invalid email address" }),

  fax: z
    .string()
    .regex(/^\+?[0-9\s\-()]{7,20}$/, { message: "Invalid fax number format" })
    .transform((val) => val.replace(/[^\d+]/g, "")) // same cleanup for fax
    .optional(),
});

export type CompanyFormValues = z.infer<typeof CompanySchema>;
