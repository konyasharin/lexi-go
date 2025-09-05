import { ErrorOptions } from "@/types";

import { error } from "./error";

export const conflict = (options?: ErrorOptions) => {
  return error("CONFLICT", options?.message ?? "Conflict");
};
