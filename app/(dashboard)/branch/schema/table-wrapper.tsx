// Filename: table-wrapper.tsx
// Path: @/app/(dashboard)/branch/schema/
import * as React from "react";

import { Table } from "./table";
import { createClient } from "@/lib/supabase/server";

async function getTableData(paginationStart: number, paginationEnd: number) {
  const supabase = await createClient();

  const { data, count, error } = await supabase
    .from("branch_schema")
    .select(
      // "id,code,name,city,state,latitude,longitude,opening_date,type,region,category,type_acceptance,rpc_linked,pincode",
      "id,code,name,state,city,pincode,region,latitude,longitude,type_acceptance,rpc_linked,type,opening_date,category",
      { count: "exact" },
    )
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
