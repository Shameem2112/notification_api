import type { NotificationQuery, NotificationType } from "../../types/notification";

interface Props {
  filters: NotificationQuery;
  setFilters: React.Dispatch<React.SetStateAction<NotificationQuery>>;
}

const types: ("all" | NotificationType)[] = [
  "all",
  "info",
  "warning",
  "success",
  "error",
];

export default function NotificationFilter({
  filters,
  setFilters,
}: Props) {
  const setReadFilter = (value: boolean | undefined) => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      isRead: value,
    }));
  };

  const setTypeFilter = (type: "all" | NotificationType) => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      type: type === "all" ? undefined : type,
    }));
  };

  return (
    <div className="space-y-5 rounded-xl bg-white p-5 shadow-sm border">

      {/* Read Filter */}

      <div>
        <p className="mb-3 text-sm font-semibold text-gray-500">
          Status
        </p>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={() => setReadFilter(undefined)}
            className={`rounded-full px-4 py-2 transition ${
              filters.isRead === undefined
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setReadFilter(false)}
            className={`rounded-full px-4 py-2 transition ${
              filters.isRead === false
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Unread
          </button>

          <button
            onClick={() => setReadFilter(true)}
            className={`rounded-full px-4 py-2 transition ${
              filters.isRead === true
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Read
          </button>

        </div>
      </div>

      {/* Type Filter */}

      <div>

        <p className="mb-3 text-sm font-semibold text-gray-500">
          Type
        </p>

        <div className="flex flex-wrap gap-3">

          {types.map((type) => (

            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`rounded-full px-4 py-2 capitalize transition ${
                (type === "all" && !filters.type) ||
                filters.type === type
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {type}
            </button>

          ))}

        </div>

      </div>

    </div>
  );
}