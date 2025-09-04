import { Ctx } from "@/types";
import { Request } from "@/types";

export const createRequest = <TInput>(obj: {
  input: TInput;
  ctx: Ctx;
}): Request<TInput> => {
  const { input, ctx } = obj;
  return {
    data: input,
    headers: ctx.resHeaders,
  };
};
