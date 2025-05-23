type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="p-2 flex items-center justify-between text-gray-500">
      {/* Prev Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="py-2 px-4 rounded-md bg-[#F5F2FF] text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed border border-gray-400"
      >
        Prev
      </button>

      {/* Page Number Buttons */}
      <div className="flex items-center gap-2 text-sm">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-2 rounded-sm ${
              currentPage === page ? "bg-[#5A31F5] text-white" : "bg-[#F5F2FF]"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="py-2 px-4 rounded-md bg-[#F5F2FF] text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed border border-gray-400"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
