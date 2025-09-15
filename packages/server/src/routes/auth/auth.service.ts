import { IdSchemaInfer } from "@repo/entities/shared";
import {
  CreateUserDataSchemaInfer,
  GetUserByEmailDataSchemaInfer,
} from "@repo/entities/user";

import { BaseService, Cookie, generateJwt, getJwtExpiresTime } from "@/utils";

import { TransactionType, usersTable } from "@/db";

export class AuthService extends BaseService {
  public async createUser(
    data: CreateUserDataSchemaInfer,
    tx?: TransactionType,
  ) {
    const newUserId = await this.client
      .get(tx)
      .insert(usersTable)
      .values(data)
      .returning({ id: usersTable.id });
    return newUserId[0];
  }

  public async getUserIdByEmail(data: GetUserByEmailDataSchemaInfer) {
    return (
      await this.client.db.query.usersTable.findFirst({
        where: (user, { eq }) => eq(user.email, data.email),
        columns: {
          id: true,
        },
      })
    )?.id;
  }

  public async getUserById(data: IdSchemaInfer) {
    return this.client.db.query.usersTable.findFirst({
      where: (user, { eq }) => eq(user.id, data.id),
      columns: {
        password: false,
      },
    });
  }

  public setJwtCookie(data: object, resHeaders: Headers) {
    const tokens = generateJwt(data);
    Cookie.set(
      resHeaders,
      process.env.NEXT_PUBLIC_JWT_ACCESS_KEY!,
      tokens.accessToken,
      {
        expires: new Date(Date.now() + getJwtExpiresTime("access")),
      },
    );
    Cookie.set(
      resHeaders,
      process.env.NEXT_PUBLIC_JWT_REFRESH_KEY!,
      tokens.refreshToken,
      {
        expires: new Date(Date.now() + getJwtExpiresTime("refresh")),
      },
    );

    return tokens;
  }
}
