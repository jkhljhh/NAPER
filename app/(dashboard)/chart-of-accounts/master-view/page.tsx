// Filename: page.tsx
// Path: @/app/(dashboard)/charts-of-accounts/master-view/
import { Suspense } from "react";

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

import { Form } from "./create/form";
import { MasterViewTable } from "./data-table/table";

const PageData = {
  title: "Master View",
  description: "Master View description",
};

export default async function Page() {
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
        <Suspense
          fallback={
            <div className="space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/6" />
              <Skeleton className="h-6 w-4/6" />
            </div>
          }
        >
          <MasterViewTable />
        </Suspense>
      </CardContent>
    </Card>
  );
}
