// export interface UserProfile {
//   id: number;
//   email: string;
//   firstName: string;
//   lastName: string;
//   gender?: string;
//   dateOfBirth?: string;
//   address?: string;
//   imagePath?: string;
//   countryName?: string;
//   phoneNumber?: string;
// }

export default interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender?: string;
  dateOfBirth?: string;
  address?: string;
  imagePath?: string;
  countryName?: string;
  phoneNumber?: string;
}

export interface UpdateUserRequest {
  id?: number;
  firstName?: string;
  lastName?: string;
  gender?: string;
  dateOfBirth?: Date | null;
  phoneNumber?: string;
  address?: string;
  imagePath?: string;
  countryName?: string;
}
