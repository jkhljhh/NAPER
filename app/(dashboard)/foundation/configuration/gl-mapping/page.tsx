// Filename: page.tsx
// Path: @/app/(dashboard)/foundation/configuration/gl-mapping
import * as React from "react";

import { createClient } from "@/lib/supabase/server";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Form } from "./create/form";
import { TableWrapper } from "./table-wrapper";

const PageData = {
  title: "GL Mapping",
  description: "description",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const safePage = Number(searchParams.page) || 1;
  const safePerPage = Number(searchParams.perPage) || 10;
  const supabase = await createClient();

  const { data: entityData, error: entityError } = await supabase
    .from("entity")
    .select("id")
    .limit(1)
    .single();

  if (entityError) {
    return <p>Please create an Entity first.</p>;
  }

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
          <TableWrapper page={safePage} perPage={safePerPage} />
        </React.Suspense>
      </CardContent>
    </Card>
  );
}
