// Filename: page.tsx
// Path: @/app/(auth)/sign-up/
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { ActionState } from "@/lib/action-helpers";
import { cn } from "@/lib/utils";

import type { Schema } from "./shared";
import { Form } from "./form";
import { formAction } from "./action";

export default function SignInPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function onSubmit(values: Schema) {
    startTransition(() => {
      const promise = formAction(values).then((result: ActionState) => {
        if (result.error) {
          throw new Error(result.message);
        }

        router.push("/sign-in");
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
    <div className={cn("flex flex-col gap-6")}>
      {/*  */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to create your account
        </p>
      </div>
      {/*  */}
      <Form onSubmit={onSubmit} isPending={isPending} />
      {/*  */}
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/sign-in" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
      {/*  */}
    </div>
  );
}
