// Filename: form.tsx
// Path: @/app/(auth)/sign-in/
"use client";

import Link from "next/link";
import { startTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { schema, defaultValues, type Schema } from "./shared";

type FormProps = {
  action: (payload: Schema) => void;
  pending: boolean;
};

export function SignInForm({ action, pending }: FormProps) {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  function onSubmit(values: Schema) {
    console.debug(values);
    startTransition(() => action(values));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="m@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel htmlFor="password">Password</FormLabel>
                <Link
                  href="/forgot-password"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Signing In..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
}
