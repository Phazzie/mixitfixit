export interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  status: number;
  timestamp: string;
}

export function createErrorResponse(error: BaseError, details?: unknown): ErrorResponse {
  return {
    error: {
      code: error.code,
      message: error.message,
      details
    },
    status: error.status,
    timestamp: new Date().toISOString()
  };
}