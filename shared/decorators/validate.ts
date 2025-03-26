export function validate<T>(schema: Schema) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const validationResult = schema.safeParse(args[0]);
      
      if (!validationResult.success) {
        throw new ValidationError(validationResult.error);
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}