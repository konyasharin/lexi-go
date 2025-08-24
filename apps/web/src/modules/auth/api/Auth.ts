import axios, { AxiosResponse } from "axios";

import { GetTokensAwaited } from "../types";

export class AuthApi {
  private static _path = `${process.env.NEXT_PUBLIC_HOST!}/api/tokens`;

  public static async getTokens() {
    return axios.get<never, AxiosResponse<{ tokens: GetTokensAwaited }>>(
      this._path,
    );
  }

  public static async deleteTokens() {
    return axios.delete<never, AxiosResponse>(this._path);
  }
}
