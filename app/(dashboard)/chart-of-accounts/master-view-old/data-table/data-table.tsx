"use client";

import * as React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Updater,
  type PaginationState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconFilter } from "@tabler/icons-react";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableViewOptions } from "./data-table-view-options";
import { useRouter } from "next/navigation";
import { DataTableToolbar } from "./data-table-toolbar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  count: number; // total rows from Supabase
  pageIndex: number;
  pageSize: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  count,
  pageIndex,
  pageSize,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    pageCount: Math.ceil(count / pageSize),
    manualPagination: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
  });

  const setPagination = (updater: Updater<PaginationState>) => {
    const next =
      typeof updater === "function"
        ? updater({ pageIndex, pageSize })
        : updater;
    const params = new URLSearchParams(window.location.search);
    params.set("page", next.pageIndex.toString());
    params.set("size", next.pageSize.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <DataTableViewOptions table={table} />
      <DataTableToolbar table={table} />

      <div className="rounded-md border my-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const column = header.column;
                  const canFilter = column.getCanFilter();

                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          {canFilter ? (
                            <div className="flex justify-between items-center">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-6 w-6 p-0"
                                  >
                                    <IconFilter className="w-4 h-4" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                  align="end"
                                  className="p-2 w-48"
                                >
                                  <Input
                                    placeholder={`Filter...`}
                                    value={
                                      (column.getFilterValue() as string) ?? ""
                                    }
                                    onChange={(e) =>
                                      column.setFilterValue(e.target.value)
                                    }
                                    className="w-full"
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          ) : (
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )
                          )}
                        </>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination
        pageIndex={table.getState().pagination.pageIndex}
        pageSize={table.getState().pagination.pageSize}
        pageCount={table.getPageCount()}
        setPagination={setPagination}
      />
    </>
  );
}
