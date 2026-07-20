import { useCallback, useEffect, useState } from "react";
import notificationService from "../services/notification.service";

import type {
  Notification,
  NotificationQuery,
  Pagination,
} from "../types/notification";

const defaultPagination: Pagination = {
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
};

export default function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState<NotificationQuery>({
    page: 1,
    limit: 10,
  });

  const [pagination, setPagination] =
    useState<Pagination>(defaultPagination);

  /**
   * Fetch all notifications
   */
  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await notificationService.getNotifications(filters);

      setNotifications(response.data.data);
      setPagination(response.data.pagination);
    } catch (err) {
      console.error(err);
      setError("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  /**
   * Get notification by ID
   */
  const getNotification = async (id: string) => {
    try {
      const response = await notificationService.getNotification(id);
      setSelectedNotification(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Create notification
   */
  const createNotification = async (data: {
    title: string;
    message: string;
    type: "info" | "warning" | "error" | "success";
    recipientId?: string;
  }) => {
    try {
      await notificationService.createNotification(data);
      await fetchNotifications();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  /**
   * Mark notification as read
   */
  const markAsRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      await fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Delete notification
   */
  const deleteNotification = async (id: string) => {
    try {
      await notificationService.deleteNotification(id);
      await fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Reset filters
   */
  const resetFilters = () => {
    setFilters({
      page: 1,
      limit: 10,
    });
  };

  return {
    notifications,
    selectedNotification,
    loading,
    error,
    pagination,
    filters,
    setFilters,
    resetFilters,
    fetchNotifications,
    getNotification,
    createNotification,
    markAsRead,
    deleteNotification,
    setSelectedNotification,
  };
}