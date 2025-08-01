import type { ApiResponse } from "../../types/ApiResponse";
import api from "../../api/axiosInstance";
import type { LoginToken } from "../../types/loginResponse";
import type { ChangePasswordType, RecoveryContactInfo } from "./authTypes";
import { getAccessToken, getRefreshToken } from "@/utils/gitAccessToken";

interface ConfirmEmailType {
  userId: number;
  token: string;
}

const AUTH_BASE_URL = "/auth";

export async function ConfirmEmailByCode(email: string, code: string) {
  const params = new URLSearchParams();
  params.append("Email", email);
  params.append("Code", code);
  const response = await api.get<ApiResponse<string>>(
    `${AUTH_BASE_URL}/confirm-email-code?${params.toString()}`
  );

  return response.data;
}

export async function RefreshToken() {
  const data = {
    refreshToken: getRefreshToken() ?? "",
    accessToken: getAccessToken() ?? "",
  };
  const response = await api<ApiResponse<LoginToken>>({
    method: "post",
    url: `${AUTH_BASE_URL}/refresh-token`,
    data,
  });

  return response.data;
}

export const ConfirmEmail = (data: ConfirmEmailType) => {
  api.get<ApiResponse<string>>(
    `${AUTH_BASE_URL}/confirm-email?userId=${
      data.userId
    }&token=${encodeURIComponent(data.token)}`
  );
};

export async function Login(UsernameOrEmail: string, Password: string) {
  const formData = new URLSearchParams({ UsernameOrEmail, Password });

  const res = await api.post<ApiResponse<LoginToken>>(
    `${AUTH_BASE_URL}/signin`,
    formData,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

  return res.data.data;
}

export async function SendChangeEmailVerification(
  currentEmail: string,
  newEmail: string
): Promise<ApiResponse<string>> {
  const res = await api.put<ApiResponse<string>>(
    `${AUTH_BASE_URL}/send-email-change?currentEmail=${encodeURIComponent(
      currentEmail
    )}&newEmail=${encodeURIComponent(newEmail)}`
  );

  return res.data;
}

export async function VerifyEmailChange(
  oldEmail: string,
  newEmail: string,
  code
): Promise<ApiResponse<string | null>> {
  const res = await api.put<ApiResponse<string | null>>(
    `${AUTH_BASE_URL}/verify-email-change`,
    {
      oldEmail,
      newEmail,
      code,
    }
  );

  return res.data;
}

export async function ChangePassword(
  data: ChangePasswordType
): Promise<ApiResponse<string>> {
  const response = await api.put<ApiResponse<string>>(
    `${AUTH_BASE_URL}/change-password`,
    {
      ...data,
    }
  );
  return response.data;
}

export async function AddRecoveryContactInformation(
  recoveryInfo: RecoveryContactInfo
): Promise<ApiResponse<string>> {
  const response = await api.put<ApiResponse<string>>(
    `${AUTH_BASE_URL}/add-recovery-contact`,
    {
      ...recoveryInfo,
    }
  );

  return response.data;
}

export async function verifyPassword(password: string) {
  const params = new URLSearchParams({ Password: password });
  const response = await api.get<ApiResponse<string>>(
    `${AUTH_BASE_URL}/verify-password?${params.toString()}`
  );

  return response.data;
}
