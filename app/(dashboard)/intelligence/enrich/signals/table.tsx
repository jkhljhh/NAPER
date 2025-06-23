// Filename: table.tsx
// Path: @/app/(dashboard)/intelligence/enrich/signals
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
  const [name] = useQueryState("name", parseAsString.withDefault(""));

  const [type] = useQueryState(
    "type",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      const matchesName =
        name === "" || item.name.toLowerCase().includes(name.toLowerCase());

      return matchesName;
    });
  }, [data, name, type]);

  const columns: ColumnDef<TableSchema>[] = [
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
      id: "region_scope",
      accessorKey: "region_scope",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Region" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["region_scope"]>();
        const variantMap: Record<TableSchema["region_scope"], BadgeVariant> = {
          national: "green",
          zone: "yellow",
          state: "blue",
        };
        const variant = variantMap[item];

        return (
          <Badge variant={variant} className="capitalize">
            {item}
          </Badge>
        );
      },
      meta: {
        label: "Region",
        variant: "multiSelect",
        options: getEnumOptions(tableSchema, "region_scope"),
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
        const item = cell.getValue<TableSchema["type"]>();
        const variantMap: Record<TableSchema["type"], BadgeVariant> = {
          monetary: "green",
          digital: "yellow",
          operational: "blue",
          macroeconomic: "purple",
        };
        const variant = variantMap[item];

        return (
          <Badge variant={variant} className="capitalize">
            {item}
          </Badge>
        );
      },
      meta: {
        label: "Type",
        variant: "multiSelect",
        options: getEnumOptions(tableSchema, "impact_direction"),
      },
      enableColumnFilter: true,
    },
    {
      id: "impact_direction",
      accessorKey: "impact_direction",
      header: ({ column }: { column: Column<TableSchema, unknown> }) => (
        <DataTableColumnHeader column={column} title="Impact" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["impact_direction"]>();
        const variantMap: Record<
          TableSchema["impact_direction"],
          BadgeVariant
        > = {
          negative: "red",
          positive: "green",
          mixed: "blue",
        };
        const variant = variantMap[item];

        return (
          <Badge variant={variant} className="capitalize">
            {item}
          </Badge>
        );
      },
      meta: {
        label: "Impact",
        variant: "multiSelect",
        options: getEnumOptions(tableSchema, "impact_direction"),
      },
      enableColumnFilter: true,
    },
    {
      id: "scope_value",
      accessorKey: "scope_value",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Scope" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["scope_value"]>();
        return <div>{item !== "NULL" ? item : "N/A"}</div>;
      },
      meta: { label: "Scope value" },
      enableColumnFilter: true,
    },
    {
      id: "value",
      accessorKey: "value",
      header: ({ column }: { column: Column<TableSchema, unknown> }) => (
        <DataTableColumnHeader column={column} title="Value" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["value"]>();
        return <div>{item}</div>;
      },
      meta: { label: "Value" },
      enableColumnFilter: true,
    },
    {
      id: "month",
      accessorKey: "month",
      header: ({ column }: { column: Column<TableSchema, unknown> }) => (
        <DataTableColumnHeader column={column} title="Month" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["month"]>();
        return <div className="capitalize">{item}</div>;
      },
      meta: {
        label: "Month",
        variant: "multiSelect",
        options: getEnumOptions(tableSchema, "month"),
      },
      enableColumnFilter: true,
    },
    {
      id: "year",
      accessorKey: "year",
      header: ({ column }: { column: Column<TableSchema, unknown> }) => (
        <DataTableColumnHeader column={column} title="Year" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["year"]>();
        return <div>{item}</div>;
      },
      meta: { label: "Year" },
      enableColumnFilter: true,
    },
    {
      id: "weight",
      accessorKey: "weight",
      header: ({ column }: { column: Column<TableSchema, unknown> }) => (
        <DataTableColumnHeader column={column} title="Weight" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["weight"]>();
        return <div>{item}</div>;
      },
      meta: { label: "Weight" },
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
      sorting: [{ id: "name", desc: false }],
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
