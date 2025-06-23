// Filename: page.tsx
// Path: @/app/(dashboard)/foundation/configuration/core-view
import * as React from "react";

import { createClient } from "@/lib/supabase/server";
import { TableSkeleton } from "@/components/table-skeleton";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/components/page-header";

import { Form } from "./create/form";
import { TableWrapper } from "./table-wrapper";

const PageData = {
  title: "Core View",
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
    <>
      <PageHeader>
        <div className="gap-1 flex flex-col">
          <PageHeaderTitle>{PageData.title}</PageHeaderTitle>
          <PageHeaderDescription>{PageData.description}</PageHeaderDescription>
        </div>
        <Form id={entityData.id} />
      </PageHeader>

      <React.Suspense fallback={<TableSkeleton />}>
        <TableWrapper page={safePage} perPage={safePerPage} />
      </React.Suspense>
    </>
  );
}
