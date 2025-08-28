import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is Required" }).max(30),
  lastName: z.string().min(1, { message: "Last Name is Required" }).max(30),
  email: z.string().email(),
  phoneNumber: z
    .string()
    .trim() // remove leading/trailing spaces
    .regex(/^\+?[0-9\s\-()]{7,20}$/, {
      message: "Invalid phone number format (e.g. +1 234-567-8901)",
    })
    .transform((val) => val.replace(/[^\d+]/g, "")) // strip everything except digits and +
    .optional(),

  typeOfInquiry: z.string().min(1, { message: "Please choose one!" }),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
