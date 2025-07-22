import { TRPCError } from '@trpc/server';

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

  private static catchBaseError(e: unknown, message?: string) {
    console.error(e);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: message ?? 'Unknown error occurred',
    });
  }
}
