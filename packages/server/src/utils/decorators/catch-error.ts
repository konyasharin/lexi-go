/* eslint-disable @typescript-eslint/no-explicit-any */

import { ErrorsHandler } from "@/utils";

export const catchError = (
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
) => {
  const method = descriptor.value;

  descriptor.value = async function (...args: any) {
    return await ErrorsHandler.handleAsync(
      async () => await method.apply(this, args),
    );
  };

  return descriptor;
};
