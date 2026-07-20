import {
  Bell,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  Check,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Notification } from "../../types/notification";

interface Props {
  notification: Notification;
  onView: (id: string) => void;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const iconMap = {
  info: <Bell className="text-blue-500" size={22} />,
  warning: <AlertTriangle className="text-yellow-500" size={22} />,
  success: <CheckCircle className="text-green-500" size={22} />,
  error: <XCircle className="text-red-500" size={22} />,
};

const badgeMap = {
  info: "bg-blue-100 text-blue-700",
  warning: "bg-yellow-100 text-yellow-700",
  success: "bg-green-100 text-green-700",
  error: "bg-red-100 text-red-700",
};

export default function NotificationCard({
  notification,
  onView,
  onRead,
  onDelete,
}: Props) {
  return (
    <div
      className={`rounded-xl border bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        !notification.isRead
          ? "border-blue-400"
          : "border-gray-200"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div>{iconMap[notification.type]}</div>

          <div>
            <h3 className="font-semibold text-lg">
              {notification.title}
            </h3>

            <span
              className={`inline-block mt-2 rounded-full px-3 py-1 text-xs font-semibold ${badgeMap[notification.type]}`}
            >
              {notification.type.toUpperCase()}
            </span>
          </div>
        </div>

        {!notification.isRead && (
          <span className="h-3 w-3 rounded-full bg-blue-500"></span>
        )}
      </div>

      {/* Message */}
      <p className="mt-4 text-gray-600 leading-relaxed">
        {notification.message}
      </p>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t pt-4">
        <span className="text-sm text-gray-400">
          {formatDistanceToNow(
            new Date(notification.createdAt),
            {
              addSuffix: true,
            }
          )}
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => onView(notification._id)}
            className="rounded-lg bg-gray-100 p-2 hover:bg-gray-200"
            title="View"
          >
            <Eye size={18} />
          </button>

          {!notification.isRead && (
            <button
              onClick={() => onRead(notification._id)}
              className="rounded-lg bg-green-500 p-2 text-white hover:bg-green-600"
              title="Mark as Read"
            >
              <Check size={18} />
            </button>
          )}

          <button
            onClick={() => onDelete(notification._id)}
            className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}