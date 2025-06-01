// Filename: page.tsx
// Path: @/app/(dashboard)/foundation/entity/
import { Suspense } from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Form } from "./form";
import { Entities } from "./entities";

const PageData = {
  title: "Entity",
  description: "Entity description",
};

export default async function Page() {
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
        <Suspense fallback={<div>Loading...</div>}>
          <Entities />
        </Suspense>
      </CardContent>
    </Card>
  );
}
