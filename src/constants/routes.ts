// src/constants/routes.ts
export const ROUTES = {
  HOME: "/",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  ADMIN: {
    DASHBOARD: "/preview/admin",
    USERS: "/preview/admin/users",
    PROFILE: "/preview/admin/account",
    SKILLS: "/preview/admin/skills",
    CATEGORIES: "/preview/admin/categories",
    COMPANIES: {
      LIST: "/preview/admin/companies",
      ADD: "/preview/admin/companies/create",
      EDIT: (Id: number | string) => `/preview/admin/companies/${Id}/Edit`,
    },
    JOBS: {
      LIST: "/preview/admin/jobs",
      ADD: "/preview/admin/jobs/create",
      EDIT: (Id: number | string) => `/preview/admin/jobs/${Id}/Edit`,
    },
  },
  MEMBER: {
    HOME: "/members",
    PROFILE: "/members/profile",
    DASHBOARD: "/members/dashboard",
    APPLICATIONS: "/members/applications",
    SAVED_JOBS: "/members/jobs",
    HISTORY: "/members/history",
    SETTINGS: "/members/settings-notifications",
    PASSWORD_SECURITY: "/members/password-security",
    RECRUITMENT: {
      HOME: "/members/recruitment",
      JOBS: {
        ADD: "/members/recruitment/create",
        EDIT: (Id: number | string) => `/members/recruitment/${Id}/Edit`,
      },
    },
  },
  PUBLIC: {
    ABOUT: "/about",
    CONTACT: "/contact",
    JOBS: "/jobs",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
  },
  PRIVATE: {
    RESET_PASSWORD: "/reset-password",
  },
  ERROR: {
    NOT_FOUND: "/404",
    FORBIDDEN: "/403",
  },
} as const;
