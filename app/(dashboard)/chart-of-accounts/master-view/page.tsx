// Filename: page.tsx
// Path: @/app/(dashboard)/charts-of-accounts/master-view/
import * as React from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/lib/supabase/server";
import { Table } from "./table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

const PageData = {
  title: "Master View",
  description: "Master View description",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page = 1, perPage = 10 } = await searchParams;
  const supabase = await createClient();

  const pageIndex = Number(page ?? 1) - 1;
  const pageSize = Number(perPage ?? 10);

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
    <Card>
      <CardHeader>
        <CardTitle>{PageData.title}</CardTitle>
        <CardDescription>{PageData.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <React.Suspense
          fallback={
            <DataTableSkeleton
              columnCount={7}
              filterCount={2}
              cellWidths={[
                "10rem",
                "30rem",
                "10rem",
                "10rem",
                "6rem",
                "6rem",
                "6rem",
              ]}
              shrinkZero
            />
          }
        >
          <Table
            data={masterViewData}
            count={Math.ceil((masterViewCount ?? 0) / pageSize)}
          />
        </React.Suspense>
      </CardContent>
    </Card>
  );
}
