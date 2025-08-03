import { decodeToken } from "./decodeToken";

export default function isAdminUser(token: string | null): boolean {
  if (!token) return false;
  const user = decodeToken(token);
  return user?.Roles?.includes("Admin") ?? false;
}
