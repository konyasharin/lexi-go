import axios, { AxiosResponse } from "axios";

import { GetTokensAwaited } from "../types";

export class AuthApi {
  public static async getTokens() {
    return axios.get<never, AxiosResponse<{ tokens: GetTokensAwaited }>>(
      `${process.env.NEXT_PUBLIC_HOST!}/api/tokens`,
    );
  }
}
