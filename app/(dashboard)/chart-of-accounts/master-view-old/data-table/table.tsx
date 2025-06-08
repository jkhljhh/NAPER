import { createClient } from "@/lib/supabase/server";

import { DataTable } from "./data-table";
import { columns } from "./columns";

export async function MasterViewTable({
  pageIndex,
  pageSize,
}: {
  pageIndex: number;
  pageSize: number;
}) {
  // const pageIndex = Number(page ?? 0);
  // const pageSize = Number(size ?? 10);

  const supabase = await createClient();

  const start = pageIndex * pageSize;
  const end = start + pageSize - 1;

  const {
    data: masterViewData,
    count: masterViewCount,
    error: masterViewError,
  } = await supabase
    .from("master_view_config")
    .select("id, name, type, start, end, order_by", { count: "exact" })
    .range(start, end);

  if (masterViewError) {
    return <p>Failed to fetch...</p>;
  }

  return (
    <DataTable
      columns={columns}
      data={masterViewData}
      count={masterViewCount ?? 0}
      pageIndex={pageIndex}
      pageSize={pageSize}
    />
  );
}
