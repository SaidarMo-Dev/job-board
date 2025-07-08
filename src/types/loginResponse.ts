export interface LoginToken {
  accessToken: string;
  refreshToken: RefreshToken;
}

export interface RefreshToken {
  userId: number;
  refreshToken: string;
  expirationDate: Date;
}
