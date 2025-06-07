import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Updater, type PaginationState } from "@tanstack/react-table";

interface ShadCNPaginationProps {
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  setPagination: (updater: Updater<PaginationState>) => void;
}

export function DataTablePagination({
  pageIndex,
  pageCount,
  pageSize,
  setPagination,
}: ShadCNPaginationProps) {
  const pages = getPaginationRange(pageIndex, pageCount);

  return (
    <div className="flex items-center justify-between px-2">
      {/* Rows per page selector */}
      {/* <div className="flex items-center space-x-6 lg:space-x-8"> */}
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          value={String(pageSize)}
          onValueChange={(value) =>
            setPagination((prev) => ({
              ...prev,
              pageSize: Number(value),
              pageIndex: 0, // reset to first page
            }))
          }
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 25, 50, 100].map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        {/* Pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (pageIndex > 0) {
                    setPagination((prev) => ({
                      ...prev,
                      pageIndex: pageIndex - 1,
                    }));
                  }
                }}
              />
            </PaginationItem>

            {pages.map((page, i) =>
              page === "..." ? (
                <PaginationItem key={`ellipsis-${i}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={`page-${page}-${i}`}>
                  <PaginationLink
                    href="#"
                    isActive={pageIndex === page - 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setPagination((prev) => ({
                        ...prev,
                        pageIndex: page - 1,
                      }));
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (pageIndex + 1 < pageCount) {
                    setPagination((prev) => ({
                      ...prev,
                      pageIndex: pageIndex + 1,
                    }));
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

function getPaginationRange(
  current: number,
  total: number,
): (number | "...")[] {
  const delta = 2;
  const range: (number | "...")[] = [];
  const left = Math.max(1, current + 1 - delta);
  const right = Math.min(total, current + 1 + delta);

  let l: number | undefined;

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= left && i <= right)) {
      if (l !== undefined && i - l > 1) {
        range.push("...");
      }
      range.push(i);
      l = i;
    }
  }

  return range;
}
