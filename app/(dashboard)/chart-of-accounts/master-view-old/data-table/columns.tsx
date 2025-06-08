"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  CheckCircle,
  CheckCircle2,
  DollarSign,
  MoreHorizontal,
  Text,
  XCircle,
} from "lucide-react";
import {
  IconSelector,
  IconDots,
  IconDotsDiagonal,
  IconDotsVertical,
} from "@tabler/icons-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Form as DeleteForm } from "../delete/form";
import { Form as EditForm } from "../edit/form";

import type { Schema } from "../edit/shared";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Schema & { id: number }>[] = [
  {
    accessorKey: "order_by",
    enableColumnFilter: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order" />
    ),
    cell: ({ row }) => <div className="px-3">{row.getValue("order_by")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="px-3">{row.getValue("name")}</div>,
    meta: {
      label: "Name",
      placeholder: "Search Name...",
      variant: "text",
      icon: Text,
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => (
      <div className="px-3">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.getValue("type")}
        </Badge>
      </div>
    ),
    meta: {
      label: "Type",
      variant: "multiSelect",
      options: [
        { label: "Expense", value: "Expense", icon: CheckCircle },
        { label: "Income", value: "Income", icon: XCircle },
      ],
    },
  },
  {
    accessorKey: "start",
    enableColumnFilter: false,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Start"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right px-3">{row.getValue("start")}</div>
    ),
  },
  {
    accessorKey: "end",
    enableColumnFilter: false,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="End"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right px-3">{row.getValue("end")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="text-right px-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <IconDotsVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <EditForm data={row.original} />
                <DeleteForm id={row.original.id} />
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
        </div>
      );
    },
  },
];
