import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_EXP_KEY,
  REFRESH_TOKEN_KEY,
} from "./constans";

export default function RemoveTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_EXP_KEY);
}
