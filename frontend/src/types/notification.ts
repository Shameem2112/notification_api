export type NotificationType =
  | "info"
  | "warning"
  | "error"
  | "success";

export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  recipientId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface NotificationsResponse {
  success: boolean;
  data: Notification[];
  pagination: Pagination;
}

export interface NotificationResponse {
  success: boolean;
  data: Notification;
}

export interface NotificationQuery {
  page?: number;
  limit?: number;
  type?: NotificationType;
  isRead?: boolean;
}

export interface CreateNotificationPayload {
  title: string;
  message: string;
  type: NotificationType;
  recipientId?: string;
}