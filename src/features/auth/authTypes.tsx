import type { User } from "../users/userTypes";

export interface AuthState {
  isAuthenticated: boolean;
  error: string | null | undefined;
  currentUser: User | null;
  loading: boolean;
}
