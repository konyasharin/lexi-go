/* eslint-disable @typescript-eslint/no-explicit-any */

import { getUserPublic } from "@/utils";

export const auth = <T extends (...args: any[]) => any>(
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
) => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const req = args[0];
    const headers: Headers = req.headers;
    getUserPublic(headers);

    return await originalMethod.apply(this, [req, ...args.slice(1)]);
  };

  return descriptor;
};
