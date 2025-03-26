interface IStatementValidator {
    validate(statement: string): ValidationResult;
    getValidationRules(): ReadonlyArray<ValidationRule>;
    isValid(statement: string): boolean;
}

type ValidationResult = {
    isValid: boolean;
    errors: ReadonlyArray<ValidationError>;
};