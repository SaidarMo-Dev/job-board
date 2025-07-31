import type { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";

export function extractAxiosErrorMessage<T>(
  err: unknown,
  fallback = "Unexpected error"
): string {
  if (axios.isAxiosError(err)) {
    const errorData = err.response?.data as ApiResponse<T> | undefined;
    return errorData?.message ?? fallback;
  }
  return fallback;
}
