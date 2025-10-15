import type { ApiResponse } from "../../shared/types/ApiResponse";
import api from "../../api/axiosInstance";
import type { LoginToken } from "../../shared/types/loginResponse";
import type { ChangePasswordType, RecoveryContactInfo } from "./authTypes";

interface ConfirmEmailType {
  userId: number;
  token: string;
}

const AUTH_BASE_URL = "/auth";

export async function Login(UsernameOrEmail: string, Password: string) {
  const formData = new URLSearchParams({ UsernameOrEmail, Password });

  const res = await api.post<ApiResponse<string[]>>(
    `${AUTH_BASE_URL}/signin`,
    formData,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

  return res.data;
}

export async function Logout() {
  const res = await api.post<string>(`${AUTH_BASE_URL}/logout`, {
    withCredentials: false,
  });
  return res.data;
}

export async function RefreshToken() {
  const response = await api<ApiResponse<LoginToken>>({
    method: "post",
    url: `${AUTH_BASE_URL}/refresh-token`,
  });

  return response.data;
}

export async function ConfirmEmailByCode(email: string, code: string) {
  const params = new URLSearchParams();
  params.append("Email", email);
  params.append("Code", code);
  const response = await api.get<ApiResponse<string>>(
    `${AUTH_BASE_URL}/confirm-email-code?${params.toString()}`
  );

  return response.data;
}

export const ConfirmEmail = (data: ConfirmEmailType) => {
  api.get<ApiResponse<string>>(
    `${AUTH_BASE_URL}/confirm-email?userId=${
      data.userId
    }&token=${encodeURIComponent(data.token)}`
  );
};

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

export async function resendCode(email: string) {
  return (
    await api.put<ApiResponse<string>>(
      `${AUTH_BASE_URL}/resend-verification-code?email=${email}`
    )
  ).data;
}

export async function sendResetPasswordCode(email: string) {
  return (
    await api.put<ApiResponse<string>>(
      `${AUTH_BASE_URL}/send-reset-password?email=${email}`
    )
  ).data;
}

export async function confirmResetPasswordCode(email: string, code: string) {
  return (
    await api.get<ApiResponse<string>>(
      `${AUTH_BASE_URL}/confirm-reset-password?Email=${email}&Code=${code}`
    )
  ).data;
}

export async function resetPassword(
  resetToken: string,
  password,
  confirmPassword: string
) {
  return (
    await api.post<ApiResponse<string>>(`${AUTH_BASE_URL}/reset-password`, {
      token: resetToken,
      password,
      confirmPassword,
    })
  ).data;
}
