export interface LoginToken {
  accessToken: string;
  refreshToken: RefreshToken;
}

export interface RefreshToken {
  refreshToken: string;
  username: string;
  expirationDate: Date;
}
