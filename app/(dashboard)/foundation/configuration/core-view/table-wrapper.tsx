// Filename: table-wrapper.tsx
// Path: @/app/(dashboard)/foundation/configuration/core-view
import * as React from "react";

import { Table } from "./table";
import { createClient } from "@/lib/supabase/server";

async function getTableData(paginationStart: number, paginationEnd: number) {
  const supabase = await createClient();

  const { data, count, error } = await supabase
    .from("chart_of_accounts_structure")
    .select("id, name, type, start, end, order_by", { count: "exact" })
    .order("order_by", { ascending: true })
    .range(paginationStart, paginationEnd);

  if (error || !data) {
    return { data: [], count: 0 };
  }

  return { data, count: count ?? 0 };
}

async function getRangeData() {
  const supabase = await createClient();
  const { data: startData, error: startError } = await supabase.rpc(
    "get_column_range",
    { column_name: "start", table_name: "chart_of_accounts_structure" },
  );

  const { data: endData, error: endError } = await supabase.rpc(
    "get_column_range",
    { column_name: "end", table_name: "chart_of_accounts_structure" },
  );

  if (startError || endError || !startData || !endData) {
    return { startRange: null, endRange: null };
  }

  return {
    startRange: { min: startData[0].min, max: startData[0].max },
    endRange: { min: endData[0].min, max: endData[0].max },
  };
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

  const [range, table] = await Promise.all([
    getRangeData(),
    getTableData(paginationStart, paginationEnd),
  ]);

  const pageCount = Math.ceil((table.count || 1) / perPage);

  return (
    <Table
      startRange={range.startRange}
      endRange={range.endRange}
      data={table.data}
      count={pageCount}
    />
  );
}
