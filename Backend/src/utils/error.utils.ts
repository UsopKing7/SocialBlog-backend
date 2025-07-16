export const formatError = (error: unknown) => 
  error instanceof Error 
    ? error.message || error.stack || error.name || error.cause
    : error