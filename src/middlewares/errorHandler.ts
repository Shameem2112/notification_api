import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';

export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  let statusCode = err instanceof ApiError ? err.statusCode : 500;
  let message = err.message || 'Internal Server Error';

  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid resource id';
  }

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors as Record<string, { message: string }>)
      .map((e) => e.message)
      .join(', ');
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = 'Duplicate resource';
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
