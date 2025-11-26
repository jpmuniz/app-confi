import { act, renderHook } from "@testing-library/react";
import { usePagination } from "../usePagination";

describe("usePagination", () => {
  it("slices items and exposes controls", () => {
    const items = Array.from({ length: 12 }, (_, index) => index + 1);
    const { result } = renderHook(() => usePagination(items, 5));

    expect(result.current.paginatedItems).toEqual([1, 2, 3, 4, 5]);
    expect(result.current.currentPage).toBe(0);
    expect(result.current.total).toBe(12);

    act(() => {
      result.current.handleNext();
    });

    expect(result.current.paginatedItems).toEqual([6, 7, 8, 9, 10]);
    expect(result.current.currentPage).toBe(1);

    act(() => {
      result.current.handleNext();
    });

    expect(result.current.paginatedItems).toEqual([11, 12]);
    expect(result.current.totalPages).toBe(3);

    act(() => {
      result.current.handlePrevious();
    });

    expect(result.current.currentPage).toBe(1);
  });

  it("resets to first page when items or page size change", () => {
    const items = [1, 2, 3, 4];
    const { result, rerender } = renderHook(({ data, pageSize }) => usePagination(data, pageSize), {
      initialProps: { data: items, pageSize: 2 }
    });

    act(() => {
      result.current.handleNext();
    });
    expect(result.current.currentPage).toBe(1);

    rerender({ data: [...items, 5, 6], pageSize: 3 });
    expect(result.current.currentPage).toBe(0);
  });
});

