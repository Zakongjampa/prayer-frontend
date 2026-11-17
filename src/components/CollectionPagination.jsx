import { ArrowLeft, ArrowRight } from "lucide-react";

export default function CollectionPagination({
  hasNextPage,
  isLoading,
  label,
  onPageChange,
  page,
  totalPages,
}) {
  return (
    <nav
      aria-label={`${label} pagination`}
      className="mt-5 flex items-center justify-between gap-2 sm:mt-7 sm:gap-4"
    >
      <button
        className="inline-flex size-10 items-center justify-center gap-2 rounded-full border border-[#eed8b352] text-sm font-semibold text-[#f4e9d2] transition duration-150 hover:bg-[#eed8b317] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d3a77c] disabled:cursor-not-allowed disabled:opacity-40 sm:size-auto sm:px-5 sm:py-2.5"
        type="button"
        aria-label={`Previous ${label.toLowerCase()} page`}
        onClick={() => onPageChange((currentPage) => currentPage - 1)}
        disabled={page === 0 || isLoading}
      >
        <ArrowLeft size={16} aria-hidden="true" />
        <span className="sr-only sm:not-sr-only">Previous</span>
      </button>
      <span
        aria-live="polite"
        className="whitespace-nowrap rounded-full bg-[#eed8b30e] px-2.5 py-2 text-xs text-[#f4e9d2b8] sm:px-4 sm:text-sm"
      >
        Page {page + 1}
        {totalPages != null ? ` of ${totalPages}` : ""}
      </span>
      <button
        className="inline-flex size-10 items-center justify-center gap-2 rounded-full bg-[#783b30] text-sm font-semibold text-[#fff7ea] shadow-[0_7px_18px_rgba(74,31,25,0.18)] transition duration-150 hover:bg-[#5f2d26] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bd795e] disabled:cursor-not-allowed disabled:opacity-40 sm:size-auto sm:px-5 sm:py-2.5"
        type="button"
        aria-label={`Next ${label.toLowerCase()} page`}
        onClick={() => onPageChange((currentPage) => currentPage + 1)}
        disabled={!hasNextPage || isLoading}
      >
        <span className="sr-only sm:not-sr-only">Next</span>
        <ArrowRight size={16} aria-hidden="true" />
      </button>
    </nav>
  );
}
