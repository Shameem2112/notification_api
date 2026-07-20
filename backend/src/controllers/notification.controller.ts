import { Request, Response } from 'express';
import Notification from '../models/notification.model';
import { ApiError } from '../utils/ApiError';
import { asyncHandler } from '../utils/asyncHandler';

/**
 * @route   POST /api/notifications
 * @desc    Create a new notification
 */
export const createNotification = asyncHandler(async (req: Request, res: Response) => {
  const notification = await Notification.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Notification created successfully',
    data: notification,
  });
});

/**
 * @route   GET /api/notifications
 * @desc    Get all notifications with pagination and optional filters
 * @query   page, limit, isRead, type
 */
export const getNotifications = asyncHandler(async (req: Request, res: Response) => {
  const { page = 1, limit = 10, isRead, type } = req.query as unknown as {
    page?: number;
    limit?: number;
    isRead?: 'true' | 'false';
    type?: string;
  };

  const filter: Record<string, unknown> = {};
  if (isRead !== undefined) filter.isRead = isRead === 'true';
  if (type) filter.type = type;

  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;
  const skip = (pageNum - 1) * limitNum;

  const [notifications, total] = await Promise.all([
    Notification.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    Notification.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: notifications,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.max(Math.ceil(total / limitNum), 1),
    },
  });
});

/**
 * @route   GET /api/notifications/:id
 * @desc    Get a single notification by id
 */
export const getNotificationById = asyncHandler(async (req: Request, res: Response) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    throw new ApiError(404, 'Notification not found');
  }

  res.status(200).json({ success: true, data: notification });
});

/**
 * @route   PATCH /api/notifications/:id/read
 * @desc    Mark a notification as read
 */
export const markAsRead = asyncHandler(async (req: Request, res: Response) => {
  const notification = await Notification.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true, runValidators: true }
  );

  if (!notification) {
    throw new ApiError(404, 'Notification not found');
  }

  res.status(200).json({
    success: true,
    message: 'Notification marked as read',
    data: notification,
  });
});

/**
 * @route   DELETE /api/notifications/:id
 * @desc    Delete a notification
 */
export const deleteNotification = asyncHandler(async (req: Request, res: Response) => {
  const notification = await Notification.findByIdAndDelete(req.params.id);

  if (!notification) {
    throw new ApiError(404, 'Notification not found');
  }

  res.status(200).json({
    success: true,
    message: 'Notification deleted successfully',
  });
});
