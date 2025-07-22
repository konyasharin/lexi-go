import { BaseController, ErrorsHandler } from '@/utils';

import { usersTable } from '@/db';

import { CreateUserSchemaInfer } from './auth.schemas';

export class AuthController extends BaseController {
  public async registerUser(data: CreateUserSchemaInfer) {
    return await ErrorsHandler.handleAsync(() =>
      this.db.insert(usersTable).values(data).returning(),
    );
  }
}
