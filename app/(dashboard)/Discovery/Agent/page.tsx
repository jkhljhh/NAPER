import { Form } from "./form"; // 👈 make sure this is the right path
import * as React from "react";

import { createClient } from "@/lib/supabase/server";
import { TableSkeleton } from "@/components/table-skeleton";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/components/page-header";
const PageData = {
  title: "Signals",
  description: "description",
};
import { TableWrapper } from "./table-wrapper";

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

        {/* ✅ This will render your form */}
        <Form id={entityData.id} />
      </PageHeader>

      <React.Suspense fallback={<TableSkeleton />}>
        <TableWrapper page={safePage} perPage={safePerPage} />
      </React.Suspense>
    </>
  );
}
