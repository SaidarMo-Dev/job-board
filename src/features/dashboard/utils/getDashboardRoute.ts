import { ROUTES } from "@/constants/routes";

const DASHBOARD_ROUTES: Record<string, string> = {
  Admin: ROUTES.ADMIN.DASHBOARD,
  Employer: ROUTES.EMPLOYER.DASHBOARD,
  JobSeeker: ROUTES.MEMBER.HOME,
};

export function getDashboardRoute(roles?: string[]): string {
  if (!roles?.length) return "/";

  const role = roles.find((r) => DASHBOARD_ROUTES[r]);

  return role ? DASHBOARD_ROUTES[role] : "/";
}
