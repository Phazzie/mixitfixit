class ValidationService implements IValidationService {
  constructor(private readonly validators: IValidator[]) {}

  validate<T>(data: unknown, context: ValidationContext): Result<T> {
    for (const validator of this.validators) {
      const result = validator.validate(data, context);
      if (!result.success) {
        return result;
      }
    }
    return success(data as T);
  }
}

