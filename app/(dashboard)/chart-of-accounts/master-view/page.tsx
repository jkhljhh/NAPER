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

import { Form } from "./form";
import { MasterViewTable } from "./master-table";

const PageData = {
  title: "Master View",
  description: "Master View description",
};

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{PageData.title}</CardTitle>
        <CardDescription>{PageData.description}</CardDescription>
        <CardAction>
          <Form />
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
