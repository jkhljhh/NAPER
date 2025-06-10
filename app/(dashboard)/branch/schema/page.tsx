// Filename: page.tsx
// Path: @/app/(dashboard)/charts-of-accounts/master-view/
import * as React from "react";

import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

import { Table } from "./table";
import { Form } from "./create/form";

const PageData = {
  title: "Schema",
  description: "Schema description",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const supabase = await createClient();

  const { page = 1, perPage = 10 } = await searchParams;
  const pageIndex = Number(page ?? 1) - 1;
  const pageSize = Number(perPage ?? 10);
  const start = pageIndex * pageSize;
  const end = start + pageSize - 1;

  const { data: entityData, error: entityError } = await supabase
    .from("entity")
    .select("id")
    .limit(1)
    .single();

  if (entityError) {
    return <p>Please create an Entity first.</p>;
  }

  const { data, count, error } = await supabase
    .from("branch_schema")
    .select(
      "id, code, name, city, state, latitude, longitude, type, zone, opening_date",
      { count: "exact" },
    )
    .range(start, end);

  if (error) {
    return <p>Failed to fetch...</p>;
  }
  console.log(data);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{PageData.title}</CardTitle>
        <CardDescription>{PageData.description}</CardDescription>
        <CardAction>
          <Form id={entityData.id} />
        </CardAction>
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
          <Table data={data} count={Math.ceil((count ?? 0) / pageSize)} />
        </React.Suspense>
      </CardContent>
    </Card>
  );
}
