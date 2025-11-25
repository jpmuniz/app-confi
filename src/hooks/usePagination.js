import { useCallback, useEffect, useMemo, useState } from "react";

export function usePagination(items = [], perPage = 5) {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(items.length / perPage)), [items.length, perPage]);

  useEffect(() => {
    setCurrentPage(0);
  }, [items]);

  const paginatedItems = useMemo(() => {
    const start = currentPage * perPage;
    return items.slice(start, start + perPage);
  }, [currentPage, items, perPage]);

  const handlePrevious = useCallback(() => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  }, [totalPages]);

  const total = items.length;
  const startIndex = total === 0 ? 0 : currentPage * perPage + 1;
  const endIndex = Math.min(total, startIndex + paginatedItems.length - 1);

  return {
    paginatedItems,
    currentPage,
    totalPages,
    total,
    startIndex,
    endIndex,
    handlePrevious,
    handleNext
  };
}

