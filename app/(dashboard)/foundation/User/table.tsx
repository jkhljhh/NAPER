// Filename: table.tsx
// Path: @/app/(dashboard)/foundation/configuration/gl-mapping
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

  // const [type] = useQueryState(
  //   "type",
  //   parseAsArrayOf(parseAsString).withDefault([]),
  // );

  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      const matchesName =
        name === "" ||
        item.name.toLowerCase().includes(name.toLowerCase());

      return matchesName;
    });
  }, [data, name]);
    // {
    //   id: "type",
    //   accessorKey: "type",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Type" />
    //   ),
    //   cell: ({ cell }) => {
    //     const item = cell.getValue<TableSchema["type"]>();
    //     const variantMap: Record<TableSchema["type"], BadgeVariant> = {
    //       income: "green",
    //       expense: "yellow",
    //     };
    //     const variant = variantMap[item] ?? "outline";

    //     return (
    //       <Badge variant={variant} className="capitalize">
    //         {item}
    //       </Badge>
    //     );
    //   },
    //   meta: {
    //     label: "Type",
    //     variant: "multiSelect",
    //     options: getEnumOptions(tableSchema, "type"),
    //   },
    //   enableColumnFilter: true,
    // },
    // {
    //   id: "group",
    //   accessorKey: "group",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Group" />
    //   ),
    //   cell: ({ cell }) => {
    //     const item = cell.getValue<TableSchema["group"]>();
    //     return <div>{item}</div>;
    //   },
    //   meta: { label: "Group" },
    //   enableColumnFilter: true,
    // },
    // {
    //   id: "description",
    //   accessorKey: "description",
    //   header: ({ column }: { column: Column<TableSchema, unknown> }) => (
    //     <DataTableColumnHeader column={column} title="Description" />
    //   ),
    //   cell: ({ cell }) => {
    //     const item = cell.getValue<TableSchema["description"]>();
    //     return <div>{item}</div>;
    //   },
    //   meta: {
    //     label: "Description",
    //   },
    //   enableColumnFilter: true,
    // },
  const columns: ColumnDef<TableSchema>[] = [
    {
      id: "user_id",
      accessorKey: "user_id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="user_id" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["user_id"]>();
        return <div>{item}</div>;
      },
      meta: { label: "user_id", 
        variant:"number",
      },
    },
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="name" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["name"]>();
        return <div>{item}</div>;
      },
      meta: {
        label: "name",
        placeholder: "Search name...",
        variant: "text",
        icon: Text,
      },
      enableColumnFilter: true,
    },
    {
  id: "email",
  accessorKey: "email",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="email" />
  ),
  cell: ({ cell }) => {
    const item = cell.getValue<TableSchema["email"]>();
    return <div>{item}</div>;
  },
  meta: {
    label: "email",
    placeholder: "Search email...",
    variant: "text",
    icon: Text,
  },
  enableColumnFilter: true,
},
 {
      id: "department",
      accessorKey: "department",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Department" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["department"]>();
        return <div>{item}</div>;
      },
      meta: {
        label: "department",
        placeholder: "Search department...",
        variant: "text",
        icon: Text,
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
      sorting: [{ id: "user_id", desc: false }],
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
