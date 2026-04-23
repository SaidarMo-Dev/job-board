import type { Industry } from "@/features/industry/industryTypes";
import { z } from "zod";

// Helper for optional string fields to handle empty inputs from HTML
const optionalString = z
  .string()
  .optional()
  .or(z.literal(""))
  .transform((val) => (val === "" ? undefined : val));

const optionalUrl = z.preprocess(
  (val) => (val === "" ? undefined : val),
  z.string().url().optional(),
) as z.ZodType<string | undefined>;

export const companySchema = z.object({
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Name is too long"),

  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens",
    ),

  description: z
    .string()
    .min(20, "Please provide a more detailed description (min 20 chars)"),

  shortDescription: z
    .string()
    .max(200, "Keep the summary under 200 characters")
    .optional(),

  // Enum for the CompanySize string
  companySize: z.enum(["Small", "Medium", "Large", "Enterprise"], {
    errorMap: () => ({ message: "Please select a valid company size" }),
  }),

  foundedYear: z.coerce
    .number({ message: "Founded year must be a number" })
    .min(1800, "Founded year must be after 1800")
    .max(new Date().getFullYear(), "Founded year cannot be in the future")
    .optional(),

  websiteUrl: optionalUrl,
  linkedInUrl: optionalUrl,
  twitterUrl: optionalUrl,

  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  address: optionalString,
  location: optionalString, // For Lat/Long or Map coordinates

  phoneNumber: optionalString,
  email: z.string().email("Invalid email address"),
  fax: optionalString,

  industryIds: z.array(z.number()).min(1, "Select at least one industry"),
});

// Infer the type from the schema
export type CompanyFormValues = z.infer<typeof companySchema>;

// The Full Type (Database state)
export interface CompanyFull extends CompanyFormValues {
  companyId: number;
  logoUrl?: string;
  bannerUrl?: string;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  isFeatured: boolean;
  industries: Industry[];
}
