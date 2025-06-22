import type { User } from "../users/userTypes";

export interface AuthState {
  isAuthenticated: boolean;
  error: string | null;
  currentUser: User | null;
}
