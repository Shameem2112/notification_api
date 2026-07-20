import { useState } from "react";
import { X } from "lucide-react";

type NotificationType = "info" | "warning" | "error" | "success";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    message: string;
    type: NotificationType;
    recipientId?: string;
  }) => Promise<void>;
}

export default function CreateNotificationModal({
  isOpen,
  onClose,
  onSubmit,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    message: "",
    type: "info" as NotificationType,
    recipientId: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }

    if (!form.message.trim()) {
      alert("Message is required");
      return;
    }

    try {
      setLoading(true);

      await onSubmit({
        title: form.title,
        message: form.message,
        type: form.type,
        recipientId: form.recipientId || undefined,
      });

      setForm({
        title: "",
        message: "",
        type: "info",
        recipientId: "",
      });

      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to create notification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Create Notification
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Title
            </label>

            <input
              className="w-full rounded-lg border p-3"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Message
            </label>

            <textarea
              rows={4}
              className="w-full rounded-lg border p-3"
              value={form.message}
              onChange={(e) =>
                setForm({
                  ...form,
                  message: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Type
            </label>

            <select
              className="w-full rounded-lg border p-3"
              value={form.type}
              onChange={(e) =>
                setForm({
                  ...form,
                  type: e.target.value as NotificationType,
                })
              }
            >
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Recipient ID (Optional)
            </label>

            <input
              className="w-full rounded-lg border p-3"
              value={form.recipientId}
              onChange={(e) =>
                setForm({
                  ...form,
                  recipientId: e.target.value,
                })
              }
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading
                ? "Creating..."
                : "Create Notification"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}