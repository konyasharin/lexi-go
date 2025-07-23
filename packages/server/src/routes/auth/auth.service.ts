import { BaseService } from '@/utils';

import { usersTable } from '@/db';

import { CreateUserSchemaInfer, UserSchemaInfer } from './auth.schemas';

export class AuthService extends BaseService {
  public async createUser(data: CreateUserSchemaInfer) {
    const newUserId = await this.db
      .insert(usersTable)
      .values(data)
      .returning({ id: usersTable.id });
    return newUserId[0];
  }

  public async getUserIdByEmail(email: UserSchemaInfer['email']) {
    return await this.db.query.usersTable.findFirst({
      where: (user, { eq }) => eq(user.email, email),
      columns: {
        id: true,
      },
    });
  }

  public async getUserById(id: UserSchemaInfer['id']) {
    return await this.db.query.usersTable.findFirst({
      where: (user, { eq }) => eq(user.id, id),
      columns: {
        password: false,
      },
    });
  }
}
