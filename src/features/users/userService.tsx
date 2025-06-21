import api from "../../api/axiosInstance";
import type { ApiResponse } from "../../types/ApiResponse";
import type RegisterFormData from "./userTypes";

const USER_BASE_URL = "/users";

export const createUser = (data: RegisterFormData) =>
  api<ApiResponse<number>>({
    method: "post",
    url: `${USER_BASE_URL}/register`,
    data: { ...data },
  });
