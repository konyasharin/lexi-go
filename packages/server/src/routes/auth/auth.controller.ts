import {
  badRequest,
  BaseController,
  catchError,
  internalServerError,
  ok,
} from '@/utils';

import { CreateUserSchemaInfer } from './auth.schemas';
import { AuthService } from './auth.service';

export class AuthController extends BaseController {
  private readonly _authService = new AuthService();

  @catchError
  public async registerUser(data: CreateUserSchemaInfer) {
    const isAlreadyExists = !!(await this._authService.getUserIdByEmail(
      data.email,
    ));
    if (!isAlreadyExists) {
      const newUserId = await this._authService.createUser(data);
      if (newUserId) return ok(newUserId);
      return internalServerError();
    }
    return badRequest({ message: 'User already exists' });
  }
}
