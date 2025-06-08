"use client";

import * as React from "react";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Form as DeleteForm } from "./delete/form";
import { Form as EditForm } from "./edit/form";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDataTable } from "@/hooks/use-data-table";

import type { Column, ColumnDef } from "@tanstack/react-table";
import { CheckCircle2, MoreHorizontal, Text, XCircle } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

interface TableSchema {
  id: number;
  name: string;
  type: "Expense" | "Income";
  start: number;
}

export function Table({ data, count }: { data: TableSchema[]; count: number }) {
  const [name] = useQueryState("name", parseAsString.withDefault(""));
  const [type] = useQueryState(
    "type",
    parseAsArrayOf(parseAsString).withDefault([]),
  );
  const [start] = useQueryState(
    "start",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      const matchesTitle =
        item.name === "" ||
        item.name.toLowerCase().includes(item.name.toLowerCase());

      const matchesStatus =
        item.type.length === 0 || item.type.includes(item.type);

      const matchesBudget =
        start.length !== 2 ||
        (Number.isFinite(Number(start[0])) &&
          Number.isFinite(Number(start[1])) &&
          item.start >= Number(start[0]) &&
          item.start <= Number(start[1]));

      return matchesTitle && matchesStatus && matchesBudget;
    });
  }, [name, type, start]);

  const columns = React.useMemo<ColumnDef<TableSchema>[]>(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: ({ column }: { column: Column<TableSchema, unknown> }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ cell }) => <div>{cell.getValue<TableSchema["name"]>()}</div>,
        meta: {
          label: "Name",
          placeholder: "Search name...",
          variant: "text",
          icon: Text,
        },
        enableColumnFilter: true,
      },
      {
        id: "type",
        accessorKey: "type",
        header: ({ column }: { column: Column<TableSchema, unknown> }) => (
          <DataTableColumnHeader column={column} title="Type" />
        ),
        cell: ({ cell }) => {
          const status = cell.getValue<TableSchema["type"]>();
          const Icon = status === "Expense" ? CheckCircle2 : XCircle;

          return (
            <Badge variant="outline" className="capitalize">
              <Icon />
              {status}
            </Badge>
          );
        },
        meta: {
          label: "Type",
          variant: "multiSelect",
          options: [
            { label: "Expense", value: "Expense" },
            { label: "Income", value: "Income" },
          ],
        },
        enableColumnFilter: true,
      },
      {
        id: "start",
        accessorKey: "start",
        header: ({ column }: { column: Column<TableSchema, unknown> }) => (
          <DataTableColumnHeader column={column} title="Start" />
        ),
        cell: ({ cell }) => {
          const start = cell.getValue<TableSchema["start"]>();

          return <div className="flex items-center gap-1">{start}</div>;
        },
        meta: {
          label: "Start",
          placeholder: "num",
          variant: "range",
        },
        enableColumnFilter: true,
      },
      {
        id: "actions",
        cell: ({ row }) => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <EditForm data={row.original} />
                <DeleteForm id={row.original.id} />
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
        size: 32,
      },
    ],
    [],
  );

  const { table } = useDataTable({
    data: filteredData,
    columns,
    pageCount: count,
    initialState: {
      sorting: [{ id: "name", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (row) => String(row.id),
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <div className="data-table-container">
      <DataTable table={table}>
        <DataTableToolbar table={table} />
      </DataTable>
    </div>
  );
}
