// Filename: table.tsx
// Path: @/app/(dashboard)/charts-of-accounts/structure/
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
  data: TableSchema[];
  count: number;
};

export function Table({ data, count }: TableProps) {
  const [pnl_head] = useQueryState("pnl_head", parseAsString.withDefault(""));

  const [type] = useQueryState(
    "type",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      const matchesName =
        pnl_head === "" ||
        item.pnl_head.toLowerCase().includes(pnl_head.toLowerCase());

      return matchesName;
    });
  }, [data, pnl_head, type]);

  const columns: ColumnDef<TableSchema>[] = [
    {
      id: "code",
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["code"]>();
        return <div>{item}</div>;
      },
      meta: { label: "Code" },
    },
    {
      id: "pnl_head",
      accessorKey: "pnl_head",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="PNL head" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["pnl_head"]>();
        return <div>{item}</div>;
      },
      meta: {
        label: "PNL head",
        placeholder: "Search PNL head...",
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
        const variantMap: Record<string, BadgeVariant> = {
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
      id: "group",
      accessorKey: "group",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Group" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["group"]>();
        return <div>{item}</div>;
      },
      meta: { label: "Group" },
      enableColumnFilter: true,
    },
    {
      id: "description",
      accessorKey: "description",
      header: ({ column }: { column: Column<TableSchema, unknown> }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["description"]>();
        return <div>{item}</div>;
      },
      meta: {
        label: "Description",
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
      sorting: [{ id: "code", desc: false }],
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
