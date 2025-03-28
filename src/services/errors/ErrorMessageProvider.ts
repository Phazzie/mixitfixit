import { ApiError } from './ApiError';
import { ValidationError } from './ValidationError';

export interface IErrorMessageProvider {
    getValidationMessage(error: ValidationError): string;
    getApiErrorMessage(error: ApiError): string;
    getRecoveryMessage(error: Error): string;
}

export class ErrorMessageProvider implements IErrorMessageProvider {
    private readonly validationMessages: Record<string, string> = {
        tooShort: 'Statement is too short. Please add more detail.',
        tooLong: 'Statement is too long. Please be more concise.',
        empty: 'Please enter a statement.',
        invalid: 'Please check your statement format.'
    };

    private readonly apiMessages: Record<string, string> = {
        rateLimit: 'Please wait a moment before trying again.',
        invalid: 'Could not analyze statements. Please rephrase.',
        timeout: 'The service is taking longer than expected.'
    };

    private readonly recoveryMessages: Record<string, string> = {
        rateLimit: 'Try again in a few minutes.',
        validation: 'Review and adjust your statement.',
        api: 'Your progress has been saved. You can resume later.'
    };

    getValidationMessage(error: ValidationError): string {
        return this.validationMessages[error.code] || 'Please check your input.';
    }

    getApiErrorMessage(error: ApiError): string {
        return this.apiMessages[error.code] || 'An unexpected error occurred.';
    }

    getRecoveryMessage(error: Error): string {
        return this.recoveryMessages[error.type as string] || 'Please try again.';
    }
}


