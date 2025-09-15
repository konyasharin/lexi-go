import { BaseResponseSchemaInfer } from "@repo/entities/shared";

export const ok = <T = undefined>(result?: T) => {
  return {
    success: true,
    ...result,
  } as T & BaseResponseSchemaInfer;
};
