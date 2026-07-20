import { useState } from "react";
import { Bell } from "lucide-react";

import NotificationCard from "../components/notifications/NotificationCard";
import NotificationFilter from "../components/notifications/NotificationFilter";
import Pagination from "../components/notifications/Pagination";
import CreateNotificationModal from "../components/notifications/CreateNotificationModal";

import useNotifications from "../hooks/useNotifications";

export default function Notifications() {
  const {
    notifications,
    loading,
    error,
    filters,
    setFilters,
    pagination,
    getNotification,
    createNotification,
    markAsRead,
    deleteNotification,
  } = useNotifications();

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl p-6">
        {/* Header */}

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold">
              <Bell className="text-blue-600" />
              Notifications
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your notifications
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-blue-100 px-4 py-2 text-blue-700 font-semibold">
              Unread: {unreadCount}
            </div>

            <button
              onClick={() => setOpenCreateModal(true)}
              className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white shadow hover:bg-blue-700 transition"
            >
              + Create Notification
            </button>
          </div>
        </div>

        {/* Filter */}

        <NotificationFilter
          filters={filters}
          setFilters={setFilters}
        />

        {/* Error */}

        {error && (
          <div className="mt-5 rounded-lg bg-red-100 p-4 text-red-600">
            {error}
          </div>
        )}

        {/* Loading */}

        {loading ? (
          <div className="mt-10 text-center text-gray-500">
            Loading notifications...
          </div>
        ) : (
          <>
            {/* Notification List */}

            <div className="mt-8 space-y-5">
              {notifications.length === 0 ? (
                <div className="rounded-xl bg-white p-12 text-center shadow">
                  <h2 className="text-xl font-semibold">
                    No notifications found
                  </h2>

                  <p className="mt-2 text-gray-500">
                    Try changing your filters.
                  </p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <NotificationCard
                    key={notification._id}
                    notification={notification}
                    onView={getNotification}
                    onRead={markAsRead}
                    onDelete={deleteNotification}
                  />
                ))
              )}
            </div>

            {/* Pagination */}

            <Pagination
              pagination={pagination}
              onPageChange={(page) =>
                setFilters((prev) => ({
                  ...prev,
                  page,
                }))
              }
            />
          </>
        )}
      </div>

      {/* Create Notification Modal */}

      <CreateNotificationModal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onSubmit={createNotification}
      />
    </div>
  );
}