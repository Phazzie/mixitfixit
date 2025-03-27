export const ERROR_MESSAGES = {
  VALIDATION: {
    INVALID_INPUT: 'Invalid input provided',
    MISSING_API_KEY: 'API key is required',
    INVALID_STATEMENTS: 'Exactly two valid statements are required',
    EMPTY_STATEMENT: 'Statements cannot be empty'
  },
  GEMINI: {
    CONTENT_POLICY: 'Content violates safety policy',
    PERMISSION_DENIED: 'API access denied',
    GENERAL: 'Gemini API error occurred'
  },
  SYSTEM: {
    INTERNAL: 'An internal server error occurred',
    CONFIGURATION: 'System configuration error'
  }
} as const;