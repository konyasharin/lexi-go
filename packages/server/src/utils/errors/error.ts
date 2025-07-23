import { TRPC_ERROR_CODE_KEY, TRPCError } from '@trpc/server';

export const error = (code: TRPC_ERROR_CODE_KEY, message: string) => {
  throw new TRPCError({
    code,
    message,
  });
};
