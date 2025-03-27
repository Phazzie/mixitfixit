export interface IStructureValidator {
    validateFile(filePath: string): Promise<ValidationResult>;
}

export interface ValidationResult {
    isValid: boolean;
    issues: ValidationIssue[];
}

export interface ValidationIssue {
    type: 'SRP' | 'INTERFACE' | 'TEST' | 'STRUCTURE';
    message: string;
    filePath: string;
    fix?: () => Promise<void>;
}