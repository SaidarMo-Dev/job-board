export interface AdminProfile {
  Id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNumber?: string;
  address?: string;
  gender?: string;
  dateOfBirth?: string;
  imagePath?: string;
  country?: string;
  roles: string[];
  twoFactorEnabled: boolean;
}

export interface adminAuthState {
  isAuthenticated: boolean;
  hasCheckedAuth: boolean;
  error: {
    fetch: string | null;
    save: string | null;
    remove: string | null;
  };
  admin: AdminProfile | null;
  loading: {
    fetch: boolean;
    save: boolean;
    remove: boolean;
  };
}
