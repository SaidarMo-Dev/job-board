import { z } from "zod";
import { roles } from "../usersTypes";

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;

export const baseUserSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is Required" }).max(30),
  lastName: z.string().min(1, { message: "Last Name is Required" }).max(30),
  email: z.string().email(),
  role: z.enum(roles, { required_error: "Please select a role" }),
});

export const addUserSchema = baseUserSchema
  .extend({
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 character(s)" })
      .max(20, { message: "Password must be at most 20 characters long" })
      .regex(passwordRegex, {
        message:
          "Password must include uppercase, lowercase, number, and special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const editUserSchema = baseUserSchema.extend({
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
});

export type AddFormData = z.infer<typeof addUserSchema>;
export type EditFormData = z.infer<typeof editUserSchema>;
export type FormData = AddFormData | EditFormData;
