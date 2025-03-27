import { ApiError } from './ApiError';
import { ErrorMessageProvider, IErrorMessageProvider } from './ErrorMessageProvider';
import { ValidationError } from './ValidationError';

class TestError extends Error {
    constructor(
        message: string,
        public code?: string,
        public type?: string
    ) {
        super(message);
    }
}

describe('ErrorMessageProvider', () => {
    let provider: IErrorMessageProvider;

    beforeEach(() => {
        provider = new ErrorMessageProvider();
    });

    describe('validation messages', () => {
        const testCases = [
            {
                scenario: 'too short statement',
                error: new ValidationError('tooShort'),
                expected: 'Statement is too short. Please add more detail.'
            },
            {
                scenario: 'empty statement',
                error: new ValidationError('empty'),
                expected: 'Please enter a statement.'
            },
            {
                scenario: 'unknown code',
                error: new ValidationError('unknown'),
                expected: 'Please check your input.'
            }
        ];

        test.each(testCases)(
            'returns correct message for $scenario',
            ({ error, expected }) => {
                expect(provider.getValidationMessage(error)).toBe(expected);
            }
        );
    });

    describe('API error messages', () => {
        const testCases = [
            {
                scenario: 'rate limit',
                error: new ApiError('rateLimit'),
                expected: 'Please wait a moment before trying again.'
            },
            {
                scenario: 'unknown error',
                error: new ApiError('unknown'),
                expected: 'An unexpected error occurred.'
            }
        ];

        test.each(testCases)(
            'returns correct message for $scenario',
            ({ error, expected }) => {
                expect(provider.getApiErrorMessage(error)).toBe(expected);
            }
        );
    });

    describe('recovery messages', () => {
        const testCases = [
            {
                scenario: 'rate limit error',
                error: new TestError('Rate limit error', undefined, 'rateLimit'),
                expected: 'Try again in a few minutes.'
            },
            {
                scenario: 'error without type',
                error: new TestError('Generic error'),
                expected: 'Please try again.'
            }
        ];

        test.each(testCases)(
            'returns correct recovery message for $scenario',
            ({ error, expected }) => {
                expect(provider.getRecoveryMessage(error)).toBe(expected);
            }
        );
    });

    describe('error recoverability', () => {
        const testCases = [
            {
                scenario: 'recoverable error',
                error: new TestError('Rate limit error', undefined, 'rateLimit'),
                expected: true
            },
            {
                scenario: 'unrecoverable error',
                error: new TestError('Generic error'),
                expected: false
            }
        ];

        test.each(testCases)(
            'correctly identifies $scenario',
            ({ error, expected }) => {
                expect(provider.isRecoverable(error)).toBe(expected);
            }
        );
    });
});





