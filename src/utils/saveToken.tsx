import type { LoginToken } from "@/types/loginResponse";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_EXP_KEY,
  REFRESH_TOKEN_KEY,
} from "@/utils/constans";

const saveToken = (tokens: LoginToken) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken.refreshToken);
  localStorage.setItem(
    REFRESH_TOKEN_EXP_KEY,
    tokens.refreshToken.expirationDate.toString()
  );
};

export { saveToken };
