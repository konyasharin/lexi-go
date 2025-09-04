import { ErrorOptions } from "@/types";

import { error } from "./error";

export const notFound = (options?: ErrorOptions) => {
  return error("NOT_FOUND", options?.message ?? "Not found");
};
