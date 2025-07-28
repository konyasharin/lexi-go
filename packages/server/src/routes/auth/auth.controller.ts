import axios, { AxiosResponse } from 'axios';
import jwt from 'jsonwebtoken';

import {
  badRequest,
  BaseController,
  catchError,
  generateJwt,
  generatePassword,
  internalServerError,
  ok,
} from '@/utils';

import 'dotenv/config';

import { BaseResponseSchemaInfer } from '../schemas';

import {
  AuthWithGoogleResponseSchemaInfer,
  CreateUserSchemaInfer,
  GoogleUserInfoSchemaInfer,
} from './auth.schemas';
import { AuthService } from './auth.service';

export class AuthController extends BaseController {
  private readonly _authService = new AuthService();

  @catchError
  public async registerUser(
    data: CreateUserSchemaInfer,
  ): Promise<BaseResponseSchemaInfer> {
    const isAlreadyExists = !!(await this._authService.getUserIdByEmail(
      data.email,
    ));
    if (!isAlreadyExists) {
      const newUser = await this._authService.createUser(data);
      if (newUser) return ok();
      return internalServerError();
    }
    return badRequest({ message: 'User already exists' });
  }

  @catchError
  public async authWithGoogle(
    code: string,
  ): Promise<AuthWithGoogleResponseSchemaInfer> {
    const response: AxiosResponse<{ id_token: string }> = await axios.post(
      process.env.GOOGLE_HANDLE_TOKEN_URL!,
      {
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.NEXT_PUBLIC_HOST!}${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_PATH}`,
        code,
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
      if (user) return ok({ tokens: generateJwt(user) });
      return internalServerError();
    }

    return internalServerError();
  }
}
