import axios from "axios";

import type {
  CreateNotificationPayload,
  NotificationQuery,
  NotificationResponse,
  NotificationsResponse,
} from "../types/notification";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

class NotificationService {
  getNotifications(params: NotificationQuery) {
    return api.get<NotificationsResponse>("/notifications", {
      params,
    });
  }

  getNotification(id: string) {
    return api.get<NotificationResponse>(
      `/notifications/${id}`
    );
  }

  createNotification(data: CreateNotificationPayload) {
    return api.post("/notifications", data);
  }

  markAsRead(id: string) {
    return api.patch(`/notifications/${id}/read`);
  }

  deleteNotification(id: string) {
    return api.delete(`/notifications/${id}`);
  }
}

export default new NotificationService();