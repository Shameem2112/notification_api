import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

type Source = 'body' | 'query' | 'params';

/**
 * Validates req[source] against the given Joi schema.
 * On failure -> 400 with a list of validation error messages.
 * On success -> req[source] is replaced with the sanitized/coerced value.
 */
export const validate =
  (schema: ObjectSchema, source: Source = 'body') =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map((d) => d.message.replace(/"/g, '')),
      });
      return;
    }

    (req as any)[source] = value;
    next();
  };
