// Filename: page.tsx
// Path: @/app/(dashboard)/foundation/configuration/gl-mapping
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
  title: "USER",
  description: "Information of all the users who are mapped to the particular department within a entity",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const safePage = Number(searchParams.page) || 1;
  const safePerPage = Number(searchParams.perPage) || 10;
  const supabase = await createClient();

  const { data: entityData, error: entityError } = await supabase
    .from("user")
    .select("user_id")
    .limit(1)
    .single();

  if (entityError) {
    return <p>Please create an Entity first.</p>;
  }

  return (
   <>
  <PageHeader>
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2">
    {/* Left: User Icon + Title + Description */}
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        {/* 👤 User Icon */}
        <img
          src="https://img.icons8.com/color/48/administrator-male.png"
          alt="User"
          className="h-8 w-8 rounded-full object-cover"
        />
        {/* 🏷️ Title */}
        <PageHeaderTitle>{PageData.title}</PageHeaderTitle>
      </div>

      {/* 📄 Description */}
      <PageHeaderDescription>{PageData.description}</PageHeaderDescription>
    </div>

    {/* Right: Form */}
    <Form id={entityData.user_id} />
  </div>
</PageHeader>


  <React.Suspense fallback={<TableSkeleton />}>
    <TableWrapper page={safePage} perPage={safePerPage} />
  </React.Suspense>
</>

  );
}
