import { catchError } from "./catch-error";
import { combineDecorators } from "./combine-decorators";

export const controllerMethod = combineDecorators(catchError);
export * from "./auth";
