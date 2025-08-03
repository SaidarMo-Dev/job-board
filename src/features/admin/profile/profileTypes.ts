export interface AdminProfile {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  country: string;
  avatar: string;
  lastLogins: Array<{ date: string; ip: string }>;
  twoFactorEnabled: boolean;
  permissions: string[];
}
