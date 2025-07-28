import { Tokens } from '../types';

export class TokensService {
  private static readonly ACCESS_TOKEN_KEY = 'access_token';
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token';

  public static setTokens(tokens: Tokens) {
    this.setAccessToken(tokens.accessToken);
    this.setRefreshToken(tokens.refreshToken);
  }

  public static getTokens() {
    return {
      accessToken: this.getAccessToken(),
      refreshToken: this.getRefreshToken(),
    };
  }

  public static setAccessToken(accessToken: string) {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
  }

  public static setRefreshToken(refreshToken: string) {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  public static getAccessToken() {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  public static getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }
}
