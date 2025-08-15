import { ErrorOptions } from "@/types";

import { error } from "./error";

export const internalServerError = (options?: ErrorOptions) => {
  return error(
    "INTERNAL_SERVER_ERROR",
    options?.message ?? "Unknown error occurred",
  );
};
