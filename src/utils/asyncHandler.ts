import { NextFunction, Request, RequestHandler, Response } from 'express';

/**
 * Wraps an async Express route handler so that any rejected promise
 * (thrown error) is automatically forwarded to the error-handling
 * middleware via next(err), instead of needing try/catch in every
 * controller function.
 */
export const asyncHandler =
  (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
