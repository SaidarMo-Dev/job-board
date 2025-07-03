export interface LoginToken {
  accessToken: string;
  refreshToken: RefreshToken;
}

export interface RefreshToken {
  refreshToken: string;
  userId: number;
  expirationDate: Date;
}
