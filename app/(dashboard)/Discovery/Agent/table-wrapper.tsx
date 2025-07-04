
import * as React from "react";

import { Table } from "./table";
import { createClient } from "@/lib/supabase/server";

async function getTableData(paginationStart: number, paginationEnd: number) {
  const supabase = await createClient();

  const { data, count, error } = await supabase
    .from("agent_dept")//department
    .select("Agent, Department,entity_id", { count: "exact" })
    .order("Agent", { ascending: true })
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

  const [ table] = await Promise.all([
   // getRangeData(),
    getTableData(paginationStart, paginationEnd),
  ]);

  const pageCount = Math.ceil((table.count || 1) / perPage);

  return (
    <Table
      // startRange={range.startRange}
      // endRange={range.endRange}
      data={table.data}
      count={pageCount}
    />
  );
}
