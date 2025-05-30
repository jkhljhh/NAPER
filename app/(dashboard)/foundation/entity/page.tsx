// Filename: page.tsx
// Path: @/app/(dashboard)/agent/blog-generator/
"use client";

import { useActionState } from "react";
import { toast } from "sonner";

import { ActionState } from "@/lib/action-helpers";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

import { type Schema } from "./shared";
import { Form } from "./form";
import { formAction } from "./action";

export default function Page() {
  const [state, action, pending] = useActionState<ActionState, Schema>(
    formAction,
    { error: false, message: "", response: "" },
  );

  if (state?.error) {
    toast(state.message);
  }

  return (
    <Card>
      <CardContent>
        <Form action={action} pending={pending} />
        {state?.error && (
          <div className="text-destructive text-sm">{state.error}</div>
        )}
      </CardContent>
    </Card>
  );
}
