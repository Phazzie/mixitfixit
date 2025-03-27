export class TextValidator {
  validate(text: string): Result<void> {
    if (!text?.trim()) {
      return failure(new ValidationError('Text cannot be empty'));
    }
    return success(void 0);
  }
}