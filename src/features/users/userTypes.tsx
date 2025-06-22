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
  usserId : number;
  email : string;
  firstName: string;
  lastName: string;
  gendor : string;
  dateOfBirth : string;
  address : string;
  imagePath : string;
  countryName : string;
}