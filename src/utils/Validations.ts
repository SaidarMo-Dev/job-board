import { EMAIL_REGEX } from "@/constants/config";

export function isEmailValid(email: string): boolean {
  return EMAIL_REGEX.test(email);
}
