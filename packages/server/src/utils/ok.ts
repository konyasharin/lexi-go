import { BaseResponseSchemaInfer } from "@/routes";

export const ok = <T = undefined>(result?: T) => {
  return {
    success: true,
    ...result,
  } as T & BaseResponseSchemaInfer;
};
