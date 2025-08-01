import jwtDecode from "jwt-decode";

interface AuthTokenPayload {
  userId: number;
  Username: string;
  Email: string;
  FirstName: string;
  LastName: string;
  Roles: string[];
  exp: Date;
  iss: string;
  aud: string;
}

export function decodeToken(token: string): AuthTokenPayload | null {
  try {
    return jwtDecode<AuthTokenPayload>(token);
  } catch (err) {
    console.error("Invalid JWT:", err);
    return null;
  }
}
