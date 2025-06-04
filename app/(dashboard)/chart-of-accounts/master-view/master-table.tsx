import { createClient } from "@/lib/supabase/server";

import { DataTable } from "./data-table/data-table";
import { columns } from "./data-table/columns";

export async function MasterViewTable() {
  const supabase = await createClient();

  const { data: masterViewData, error: masterViewError } = await supabase
    .from("master_view_config")
    .select("id, name, type, start, end, order_by");

  if (masterViewError) {
    return <p>Failed to fetch...</p>;
  }

  return <DataTable columns={columns} data={masterViewData} />;
}
