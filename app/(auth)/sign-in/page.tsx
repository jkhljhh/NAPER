// Filename: page.tsx
// Path: @/app/(auth)/sign-in/
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { ActionState } from "@/lib/action-helpers";
import { cn } from "@/lib/utils";

import type { Schema } from "./shared";
import { SignInForm as Form } from "./form";
import { signInAction } from "./action";

export default function SignInPage() {
  const router = useRouter();

  const [state, action, pending] = useActionState<ActionState, Schema>(
    signInAction,
    { error: false, message: "", response: "" },
  );

  useEffect(() => {
    if (pending) return;
    if (!state.message) return;

    if (state?.error === true) {
      toast.error(state.message);
    } else {
      toast.success(state.message);
      router.push("/");
    }
  }, [state.error, state.message, state.response, pending, router]);

  return (
    <div className={cn("flex flex-col gap-6")}>
      {/*  */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign in to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to sign in to your account
        </p>
      </div>
      {/*  */}
      <Form action={action} pending={pending} />
      {/*  */}
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
      {/*  */}
    </div>
  );
}
