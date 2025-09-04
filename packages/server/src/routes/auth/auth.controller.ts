import { Request } from "@/types";

import axios, { AxiosResponse } from "axios";
import jwt from "jsonwebtoken";

import {
  badRequest,
  BaseController,
  controllerMethod,
  generatePassword,
  internalServerError,
  ok,
} from "@/utils";

import "dotenv/config";

import { BaseResponseSchemaInfer } from "../schemas";

import {
  CreateUserSchemaInfer,
  GoogleUserInfoSchemaInfer,
} from "./auth.schemas";
import { AuthService } from "./auth.service";

export class AuthController extends BaseController {
  private readonly _authService = new AuthService();

  @controllerMethod
  public async registerUser(
    req: Request<CreateUserSchemaInfer>,
  ): Promise<BaseResponseSchemaInfer> {
    const isAlreadyExists = !!(await this._authService.getUserIdByEmail(
      req.data.email,
    ));
    if (!isAlreadyExists) {
      const newUser = await this._authService.createUser(req.data);
      if (newUser) return ok();
      return internalServerError();
    }
    return badRequest({ message: "User already exists" });
  }

  @controllerMethod
  public async authWithGoogle(
    req: Request<string>,
  ): Promise<BaseResponseSchemaInfer> {
    const response: AxiosResponse<{ id_token: string }> = await axios.post(
      process.env.GOOGLE_HANDLE_TOKEN_URL!,
      {
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_uri: `${process.env.NEXT_PUBLIC_HOST!}${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_PATH}`,
        code: req.data,
      },
    );

    if (response.data) {
      const googleUserInfo = jwt.decode(
        response.data.id_token,
      ) as GoogleUserInfoSchemaInfer;

      let userId = await this._authService.getUserIdByEmail(
        googleUserInfo.email,
      );

      if (!userId) {
        const newUser = await this._authService.createUser({
          email: googleUserInfo.email,
          password: generatePassword(googleUserInfo.email),
        });
        if (newUser) userId = newUser.id;
        else return internalServerError();
      }

      const user = await this._authService.getUserById(userId);
      if (!user) return internalServerError();
      this._authService.setJwtCookie(user, req.headers);
      return ok();
    }

    return internalServerError();
  }

  @controllerMethod
  public async refresh(req: Request<string>): Promise<BaseResponseSchemaInfer> {
    const { exp, iat, ...data } = jwt.verify(
      req.data,
      process.env.JWT_REFRESH_SECRET!,
    ) as { exp: number; iat: number };
    this._authService.setJwtCookie(data, req.headers);
    return ok();
  }
}
