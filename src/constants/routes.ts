// src/constants/routes.ts
export const ROUTES = {
  HOME: "/",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  ADMIN: {
    DASHBOARD: "/preview/admin",
    USERS: "/preview/admin/users",
    PROFILE : "/preview/admin/account",
    SKILLS : "/preview/admin/skills"
  },
  MEMBER: {
    HOME: "/members",
    PROFILE: "/member/profile",
    DASHBOARD: "/member/dashboard",
  },
  PUBLIC: {
    ABOUT: "/about",
    CONTACT: "/contact",
  },
  ERROR: {
    NOT_FOUND: "/404",
    FORBIDDEN: "/403",
  },
} as const;
