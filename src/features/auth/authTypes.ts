import type { CurrentUser } from "../users/userTypes";

export interface AuthState {
  isAuthenticated: boolean;
  error: string | null | undefined;
  currentUser: CurrentUser | null;
  loading: boolean;
}

export interface ChangePasswordType {
  id: number;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface RecoveryContactInfo {
  userId: number;
  email: string;
  phoneNumber: string;
}