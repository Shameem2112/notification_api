import { Router } from 'express';
import * as controller from '../controllers/notification.controller';
import { validate } from '../middlewares/validate';
import {
  createNotificationSchema,
  idParamSchema,
  listQuerySchema,
} from '../validators/notification.validator';

const router = Router();

router.post('/', validate(createNotificationSchema, 'body'), controller.createNotification);

router.get('/', validate(listQuerySchema, 'query'), controller.getNotifications);


router.get('/:id', validate(idParamSchema, 'params'), controller.getNotificationById);


router.patch('/:id/read', validate(idParamSchema, 'params'), controller.markAsRead);


router.delete('/:id', validate(idParamSchema, 'params'), controller.deleteNotification);

export default router;
