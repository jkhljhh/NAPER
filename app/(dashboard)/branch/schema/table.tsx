"use client";

import * as React from "react";

import type { Column, ColumnDef } from "@tanstack/react-table";
import { CheckCircle2, MoreHorizontal, Text, XCircle } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Form as DeleteForm } from "./delete/form";
import { Form as EditForm } from "./edit/form";
import { type Schema } from "./edit/shared";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDataTable } from "@/hooks/use-data-table";
import { cn } from "@/lib/utils";

type TableSchema = Schema;

export function Table({ data, count }: { data: TableSchema[]; count: number }) {
  const [name] = useQueryState("name", parseAsString.withDefault(""));
  const [type] = useQueryState(
    "type",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      const matchesName =
        item.name === "" ||
        item.name.toLowerCase().includes(item.name.toLowerCase());

      const matchesType =
        item.type.length === 0 || item.type.includes(item.type);

      return matchesName && matchesType;
    });
  }, [name, type]);

  const columns = React.useMemo<ColumnDef<TableSchema>[]>(
    () => [
      {
        id: "code",
        accessorKey: "code",
        header: ({ column }: { column: Column<TableSchema, unknown> }) => (
          <DataTableColumnHeader column={column} title="Code" />
        ),
        cell: ({ cell }) => <div>{cell.getValue<TableSchema["code"]>()}</div>,
        meta: {
          label: "Code",
        },
      },
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
        id: "state",
        accessorKey: "state",
        header: ({ column }: { column: Column<TableSchema, unknown> }) => (
          <DataTableColumnHeader column={column} title="State" />
        ),
        cell: ({ cell }) => <div>{cell.getValue<TableSchema["state"]>()}</div>,
        meta: {
          label: "State",
        },
        enableColumnFilter: true,
      },
      {
        id: "city",
        accessorKey: "city",
        header: ({ column }: { column: Column<TableSchema, unknown> }) => (
          <DataTableColumnHeader column={column} title="City" />
        ),
        cell: ({ cell }) => <div>{cell.getValue<TableSchema["city"]>()}</div>,
        meta: {
          label: "City",
        },
        enableColumnFilter: true,
      },
      {
        id: "latitude",
        accessorKey: "latitude",
        header: ({ column }: { column: Column<TableSchema, unknown> }) => (
          <DataTableColumnHeader column={column} title="Latitude" />
        ),
        cell: ({ cell }) => (
          <div>{cell.getValue<TableSchema["latitude"]>()}</div>
        ),
        meta: {
          label: "Latitude",
        },
        enableColumnFilter: false,
      },
      {
        id: "longitude",
        accessorKey: "longitude",
        header: ({ column }: { column: Column<TableSchema, unknown> }) => (
          <DataTableColumnHeader column={column} title="Longitude" />
        ),
        cell: ({ cell }) => (
          <div>{cell.getValue<TableSchema["longitude"]>()}</div>
        ),
        meta: {
          label: "Longitude",
        },
        enableColumnFilter: false,
      },
      {
        id: "type",
        accessorKey: "type",
        header: ({ column }: { column: Column<TableSchema, unknown> }) => (
          <DataTableColumnHeader column={column} title="Type" />
        ),
        cell: ({ cell }) => {
          const type = cell.getValue<TableSchema["type"]>();
          return (
            <Badge
              variant="outline"
              className={cn(
                type === "urban" &&
                  "bg-green-400/10 text-green-600 border-green-400/50",
                type === "rural" &&
                  "bg-sky-400/10 text-sky-600/80 border-sky-400/50",
                "capitalize",
              )}
            >
              {type}
            </Badge>
          );
        },
        meta: {
          label: "Type",
          variant: "multiSelect",
          options: [
            { label: "Urban", value: "urban" },
            { label: "Rural", value: "rural" },
          ],
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
      sorting: [{ id: "code", desc: false }],
      columnPinning: { right: ["actions"] },
    },
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
