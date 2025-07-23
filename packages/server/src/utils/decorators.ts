/* eslint-disable */
import { ErrorsHandler } from './errors-handler';

export const catchError = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  const method = descriptor.value;

  descriptor.value = async function (...args: any) {
    await ErrorsHandler.handleAsync(async () => await method.apply(this, args));
  };

  return descriptor;
}
