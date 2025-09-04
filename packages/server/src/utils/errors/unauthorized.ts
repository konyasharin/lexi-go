import { ErrorOptions } from "@/types";

import { error } from "@/utils";

export const unauthorized = (options?: ErrorOptions) => {
  return error("UNAUTHORIZED", options?.message ?? "Unauthorized");
};
