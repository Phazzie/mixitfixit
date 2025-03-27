interface IUserInput {
    validateInput(input: string): ValidationResult;
    sanitizeInput(input: string): string;
    handleSubmit(input: string): Promise<void>;
}

export class UserInput implements IUserInput {
    private readonly validator: InputValidator;
    private readonly sanitizer: InputSanitizer;
    
    constructor(
        validator: InputValidator,
        sanitizer: InputSanitizer
    ) {
        this.validator = validator;
        this.sanitizer = sanitizer;
    }

    validateInput(input: string): ValidationResult {
        return this.validator.validate(input);
    }

    sanitizeInput(input: string): string {
        return this.sanitizer.sanitize(input);
    }

    async handleSubmit(input: string): Promise<void> {
        const sanitized = this.sanitizeInput(input);
        const validation = this.validateInput(sanitized);
        if (!validation.isValid) throw new InputValidationError(validation.errors);
        // Handle submission
    }
}