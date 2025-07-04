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

import { type Schema, schema } from "./shared";

type TableSchema = Schema;
const tableSchema = schema;
type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

type TableProps = {
  //startRange: { min: number; max: number } | null;
 // endRange: { min: number; max: number } | null;
  data: TableSchema[];
  count: number;
};

export function Table({ data, count }: TableProps) {
  const [name] = useQueryState("Agent", parseAsString.withDefault(""));
  // const [type] = useQueryState(
  //   "type",
  //   parseAsArrayOf(parseAsString).withDefault([]),
  // );
  // const [start] = useQueryState(
  //   "start",
  //   parseAsArrayOf(parseAsString).withDefault([]),
  // );

  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      const matchesName =
        name === "" || item.Agent.toLowerCase().includes(name.toLowerCase());

      // const matchesType = type.length === 0 || type.includes(item.type);

      // const matchesStart =
      //   start.length !== 2 ||
      //   (Number.isFinite(Number(start[0])) &&
      //     Number.isFinite(Number(start[1])) &&
      //     item.start >= Number(start[0]) &&
      //     item.start <= Number(start[1]));

      return matchesName// && matchesType && matchesStart;
    });
  }, [data, name]);

  const columns: ColumnDef<TableSchema>[] = [

    {
      id: "Agent",
      accessorKey: "Agent",
      header: ({ column }: { column: Column<TableSchema, unknown> }) => (
        <DataTableColumnHeader column={column} title="Agent" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["Agent"]>();
        return <div>{item === ""? "-" : item}</div>;
      },
      meta: {
        label: "Agent",
        placeholder: "Agent",
        variant: "text",
        //range: [startRange!.min, startRange!.max],
      },
      enableColumnFilter: true,
    },
    {
      id: "Department",
      accessorKey: "Department",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Department" />
      ),
      cell: ({ cell }) => {
        const item = cell.getValue<TableSchema["Department"]>();
        return <div>{item}</div>;
      },
      meta: {
        label: "Department",
        placeholder: "Search Department...",
        variant: "text",
        icon: Text,
      },
      enableColumnFilter: true,
    },
    // {
    //   id: "desc",
    //   accessorKey: "desc",
    //   header: ({ column }: { column: Column<TableSchema, unknown> }) => (
    //     <DataTableColumnHeader column={column} title="Description" />
    //   ),
    //   cell: ({ cell }) => {
    //     const item = cell.getValue<TableSchema["desc"]>();
    //     return <div>{item === "" ? "-" : item}</div>;
    //   },
    //   meta: {
    //     // label: "Description",
    //     // placeholder: "Description",
    //     // variant: "text",
    //     //range: [startRange!.min, startRange!.max],
    //   },
    //  enableColumnFilter: true,
    // },
    //   {
    //   id: "actions",
    //   cell: ({ row }) => {
    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant="ghost" size="icon">
    //             <MoreHorizontal className="h-4 w-4" />
    //             <span className="sr-only">Open menu</span>
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
              
              
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     );
    //   },
    //   size: 32,
    // },
  ];

  const { table } = useDataTable({
    data: filteredData,
    columns,
    pageCount: count,
    initialState: {
      sorting: [{ id: "Agent", desc: false }],
      columnPinning: { right: ["actions"] },
    },
    shallow: false,
    getRowId: (row) => String(row.Agent),
  });

  return (
    <div className="data-table-container">
      <DataTable table={table}>
        <DataTableToolbar table={table} />
      </DataTable>
    </div>
  );
}
