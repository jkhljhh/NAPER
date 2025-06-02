// Filename: page.tsx
// Path: @/app/(dashboard)/foundation/finance-year/
"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ActionState } from "@/lib/action-helpers";

import { type Schema } from "./shared";
import { Form } from "./form";
import { formAction } from "./action";

const PageData = {
  title: "Financial Year",
  description: "Market description",
};

export default function Page() {
  const [isPending, startTransition] = useTransition();

  function onSubmit(values: Schema) {
    startTransition(() => {
      const promise = formAction(values).then((result: ActionState) => {
        if (result.error) {
          throw new Error(result.message);
        }

        return result.message;
      });

      toast.promise(promise, {
        loading: "Loading...",
        success: (msg) => msg || "Successfull.",
        error: (err) => err.message || "Something went wrong",
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{PageData.title}</CardTitle>
        <CardDescription>{PageData.description}</CardDescription>
        <CardAction>
          <Form onSubmit={onSubmit} isPending={isPending} />
        </CardAction>
      </CardHeader>
      <CardContent>Data display</CardContent>
    </Card>
  );
}
