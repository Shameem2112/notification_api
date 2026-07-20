import type { Pagination as PaginationType } from "../../types/notification";
interface Props {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pagination,
  onPageChange,
}: Props) {
  const { page, totalPages } = pagination;

  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex items-center justify-center gap-2">

      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-lg border px-4 py-2 disabled:opacity-50"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`h-10 w-10 rounded-lg transition ${
              pageNumber === page
                ? "bg-blue-600 text-white"
                : "border hover:bg-gray-100"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-lg border px-4 py-2 disabled:opacity-50"
      >
        Next
      </button>

    </div>
  );
}