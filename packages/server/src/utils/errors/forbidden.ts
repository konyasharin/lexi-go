import { ErrorOptions } from "@/types";

import { error } from "./error";

export const forbidden = (options?: ErrorOptions) => {
  return error("FORBIDDEN", options?.message ?? "Forbidden");
};
