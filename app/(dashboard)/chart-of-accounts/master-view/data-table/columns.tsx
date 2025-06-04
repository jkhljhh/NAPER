"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IconSelector } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

import { Schema } from "../shared";

export const columns: ColumnDef<Schema>[] = [
  {
    accessorKey: "order_by",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order
          <IconSelector className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <IconSelector className="ml-2 h-4 w-4" />
          </Button>
        </>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <IconSelector className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "start",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start
          <IconSelector className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "end",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End
          <IconSelector className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
