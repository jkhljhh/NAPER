// Filename: table.tsx
// Path: @/app/(dashboard)/foundation/configuration/core-view
"use client";

import * as React from "react";

import type { Column, ColumnDef } from "@tanstack/react-table";
import { VariantProps } from "class-variance-authority";
import { MoreHorizontal, Text } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

import { useDataTable } from "@/hooks/use-data-table";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getEnumOptions } from "@/lib/utils";

import { Form as DeleteForm } from "./delete/form";
import { Form as EditForm } from "./edit/form";
import { type Schema, schema } from "./edit/shared";

type TableSchema = Schema;
const tableSchema = schema;
type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

type TableProps = {
  startRange: { min: number; max: number } | null;
  endRange: { min: number; max: number } | null;
  data: TableSchema[];
  count: number;
};

export function Table({ startRange, endRange, data, count }: TableProps) {
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
      const matchesName =
        name === "" || item.name.toLowerCase().includes(name.toLowerCase());

      const matchesType = type.length === 0 || type.includes(item.type);

      const matchesStart =
        start.length !== 2 ||
        (Number.isFinite(Number(start[0])) &&
          Number.isFinite(Number(start[1])) &&
          item.start >= Number(start[0]) &&
          item.start <= Number(start[1]));

      return matchesName && matchesType && matchesStart;
    });
  }, [data, name, type, start]);

  const columns: ColumnDef<TableSchema>[] = [
    {
      id: "order_by",
      accessorKey: "order_by",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Order" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["order_by"]>();
        return <div>{item}</div>;
      },
      meta: { label: "Order" },
    },
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["name"]>();
        return <div>{item}</div>;
      },
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
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["type"]>();
        const variantMap: Record<TableSchema["type"], BadgeVariant> = {
          income: "green",
          expense: "yellow",
          derived: "blue",
        };
        const variant = variantMap[item] ?? "outline";

        return (
          <Badge variant={variant} className="capitalize">
            {item}
          </Badge>
        );
      },
      meta: {
        label: "Type",
        variant: "multiSelect",
        options: getEnumOptions(tableSchema, "type"),
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
        const item = cell.getValue<TableSchema["start"]>();
        return <div>{item === 0 ? "-" : item}</div>;
      },
      meta: {
        label: "Start",
        placeholder: "num",
        variant: "range",
        range: [startRange!.min, startRange!.max],
      },
      enableColumnFilter: true,
    },
    {
      id: "end",
      accessorKey: "end",
      header: ({ column }: { column: Column<TableSchema, unknown> }) => (
        <DataTableColumnHeader column={column} title="End" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["end"]>();
        return <div>{item === 0 ? "-" : item}</div>;
      },
      meta: {
        label: "End",
        placeholder: "num",
        variant: "range",
        range: [endRange!.min, endRange!.max],
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
  ];

  const { table } = useDataTable({
    data: filteredData,
    columns,
    pageCount: count,
    initialState: {
      sorting: [{ id: "order_by", desc: false }],
      columnPinning: { right: ["actions"] },
    },
    shallow: false,
    getRowId: (row) => String(row.id),
  });

  return (
    <div className="data-table-container">
      <DataTable table={table}>
        <DataTableToolbar table={table} />
      </DataTable>
    </div>
  );
}
