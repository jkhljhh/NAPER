// Filename: page.tsx
// Path: @/app/(auth)/sign-up/
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { ActionState } from "@/lib/action-helpers";
import { cn } from "@/lib/utils";

import type { Schema } from "./shared";
import { SignUpForm as Form } from "./form";
import { signUpAction } from "./action";

export default function SignInPage() {
  const router = useRouter();

  const [state, action, pending] = useActionState<ActionState, Schema>(
    signUpAction,
    { error: false, message: "", response: "" },
  );

  useEffect(() => {
    if (pending) return;
    if (!state.message) return;

    if (state?.error === true) {
      toast.error(state.message);
    } else {
      toast.success(state.message);
      router.push("/sign-in");
    }
  }, [state.error, state.message, state.response, pending, router]);

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
      <Form action={action} pending={pending} />
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
