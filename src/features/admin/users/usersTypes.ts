export interface UserManagement {
  id: number;
  name: string;
  gender: string;
  phone: string;
  email: string;
  role: RoleType;
  status: string;
  joinDate: string;
  avatar: string;
}

export type RoleType = "Admin" | "Employer" | "JobSeeker";
