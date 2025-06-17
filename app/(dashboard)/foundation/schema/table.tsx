// Filename: table.tsx
// Path: @/app/(dashboard)/branch/schema/
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
import { cn, getEnumOptions } from "@/lib/utils";

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

      const matchesType = type.length === 0 || type.includes(item.type);

      return matchesName && matchesType;
    });
  }, [data, name, type]);

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
      id: "state",
      accessorKey: "state",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="State" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["state"]>();
        return <div>{item}</div>;
      },
      meta: {
        label: "State",
      },
      // enableColumnFilter: true,
    },
    {
      id: "city",
      accessorKey: "city",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="City" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["city"]>();
        return <div>{item}</div>;
      },
      meta: {
        label: "City",
      },
      // enableColumnFilter: true,
    },
    {
      id: "pincode",
      accessorKey: "pincode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pincode" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["pincode"]>();
        return <div>{item}</div>;
      },
      meta: {
        label: "Pincode",
      },
      // enableColumnFilter: true,
    },
    {
      id: "region",
      accessorKey: "region",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Region" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["region"]>();
        const variantMap: Record<TableSchema["region"], BadgeVariant> = {
          north: "green",
          south: "yellow",
          east: "blue",
          west: "purple",
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
        options: getEnumOptions(tableSchema, "region"),
      },
      enableColumnFilter: true,
    },
    {
      id: "latitude",
      accessorKey: "latitude",
      header: ({ column }: { column: Column<TableSchema, unknown> }) => (
        <DataTableColumnHeader column={column} title="Latitude" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["latitude"]>();
        return <div>{item}</div>;
      },
      meta: {
        label: "Latitude",
      },
    },
    {
      id: "longitude",
      accessorKey: "longitude",
      header: ({ column }: { column: Column<TableSchema, unknown> }) => (
        <DataTableColumnHeader column={column} title="Longitude" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["longitude"]>();
        return <div>{item}</div>;
      },
      meta: {
        label: "Longitude",
      },
    },
    {
      id: "type_acceptance",
      accessorKey: "type_acceptance",
      header: ({ column }: { column: Column<TableSchema, unknown> }) => (
        <DataTableColumnHeader column={column} title="Type Acceptance" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["type_acceptance"]>();
        return <div>{item}</div>;
      },
      meta: {
        label: "Type Acceptance",
      },
    },
    {
      id: "rpc_linked",
      accessorKey: "rpc_linked",
      header: ({ column }: { column: Column<TableSchema, unknown> }) => (
        <DataTableColumnHeader column={column} title="RPC Linked" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["rpc_linked"]>();
        return <div>{item}</div>;
      },
      meta: {
        label: "RPC Linked",
      },
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
          wealth: "green",
          retail: "yellow",
          "business banking": "blue",
          "mega retail": "purple",
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
        options: getEnumOptions(tableSchema, "type"),
      },
      enableColumnFilter: true,
    },
    {
      id: "opening_date",
      accessorKey: "opening_date",
      header: ({ column }: { column: Column<TableSchema, unknown> }) => (
        <DataTableColumnHeader column={column} title="Opening Date" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["opening_date"]>();
        return <div>{item.toString()}</div>;
      },
      meta: {
        label: "Opening Date",
      },
    },
    {
      id: "category",
      accessorKey: "category",
      header: ({ column }: { column: Column<TableSchema, unknown> }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["category"]>();
        const variantMap: Record<TableSchema["category"], BadgeVariant> = {
          metro: "green",
          rural: "yellow",
          "semi urban": "blue",
          urban: "purple",
        };
        const variant = variantMap[item];
        return (
          <Badge variant={variant} className="capitalize">
            {item}
          </Badge>
        );
      },
      meta: {
        label: "Category",
        variant: "multiSelect",
        options: getEnumOptions(tableSchema, "category"),
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
