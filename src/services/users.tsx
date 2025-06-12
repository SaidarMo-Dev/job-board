import api from "../api/axiosInstance";
import type RegisterFormData from "../types/types/RegisterFormData";

const USER_BASE_URL = "/Users";

export const createUser = (data: RegisterFormData) =>
  api.post(`${USER_BASE_URL}/Register`, data);
