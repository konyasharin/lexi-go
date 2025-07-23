import { TRPCError } from '@trpc/server';

import { internalServerError } from './errors';

export class ErrorsHandler {
  public static handle<T>(func: () => T, message?: string) {
    try {
      return func();
    } catch (e) {
      ErrorsHandler.catchBaseError(e, message);
    }
  }

  public static async handleAsync<T>(func: () => T, message?: string) {
    try {
      return await func();
    } catch (e) {
      ErrorsHandler.catchBaseError(e, message);
    }
  }

  public static catchBaseError(e: unknown, message?: string) {
    console.error(e);
    if (!(e instanceof TRPCError)) {
      return internalServerError({ message });
    }

    throw e;
  }
}
