import Joi from 'joi';

export const createNotificationSchema = Joi.object({
  title: Joi.string().trim().min(1).max(150).required(),
  message: Joi.string().trim().min(1).max(1000).required(),
  type: Joi.string().valid('info', 'warning', 'error', 'success').required(),
  isRead: Joi.boolean().optional(),
  recipientId: Joi.string().trim().optional(),
});

export const listQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
  isRead: Joi.string().valid('true', 'false').optional(),
  type: Joi.string().valid('info', 'warning', 'error', 'success').optional(),
});

export const idParamSchema = Joi.object({
  id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      'string.hex': 'Invalid notification id',
      'string.length': 'Invalid notification id',
      'any.required': 'Notification id is required',
    }),
});
