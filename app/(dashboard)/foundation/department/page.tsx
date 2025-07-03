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
  title: "DEPARTMENT",
  description: "Information regarding all the departments present within the Entity",
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
  <div className="gap-1 flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
    <div className="flex items-center gap-3">
      {/* Logo */}
      <img
        src="https://img.icons8.com/fluency/48/department.png"
        alt="Department Logo"
        className="h-10 w-10 rounded-full object-cover"
      />

      {/* Title & Description */}
      <div className="flex flex-col">
        <PageHeaderTitle>{PageData.title}</PageHeaderTitle>
        <PageHeaderDescription>{PageData.description}</PageHeaderDescription>
      </div>
    </div>

    {/* Form */}
    <Form id={entityData.id} />
  </div>
</PageHeader>


      <React.Suspense fallback={<TableSkeleton />}>
        <TableWrapper page={safePage} perPage={safePerPage} />
      </React.Suspense>
    </>
  );
}
