export const combineDecorators = (
  ...decorators: MethodDecorator[]
): MethodDecorator => {
  return (target, propertyKey, descriptor) => {
    for (const decorator of decorators) {
      decorator(target, propertyKey, descriptor);
    }
    return descriptor!;
  };
};
