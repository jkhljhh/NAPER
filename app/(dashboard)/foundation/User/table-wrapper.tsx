// Filename: table-wrapper.tsx
// Path: @/app/(dashboard)/foundation/configuration/gl-mapping
import * as React from "react";

import { Table } from "./table";
import { createClient } from "@/lib/supabase/server";

async function getTableData(paginationStart: number, paginationEnd: number) {
  const supabase = await createClient();

  const { data, count, error } = await supabase
    .from("user")
    .select("id,entity_id, user_id, name,department, email", { count: "exact" })
    .order("user_id", { ascending: true })
    .range(paginationStart, paginationEnd);

  if (error || !data) {
    return { data: [], count: 0 };
  }

  return { data, count: count ?? 0 };
}

export async function TableWrapper({
  page,
  perPage,
}: {
  page: number;
  perPage: number;
}) {
  const pageIndex = Math.max(0, page - 1);
  const paginationStart = pageIndex * perPage;
  const paginationEnd = paginationStart + perPage - 1;

  const [table] = await Promise.all([
    getTableData(paginationStart, paginationEnd),
  ]);

  const pageCount = Math.ceil((table.count || 1) / perPage);

  return <Table data={table.data} count={pageCount} />;
}
