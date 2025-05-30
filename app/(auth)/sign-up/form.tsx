// Filename: form.tsx
// Path: @/app/(auth)/sign-up/
"use client";

import Link from "next/link";
import { startTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { schema, defaultValues, type Schema } from "./shared";
import { Spinner } from "@/components/ui/spinner";

type FormProps = {
  action: (payload: Schema) => void;
  pending: boolean;
};

export function SignUpForm({ action, pending }: FormProps) {
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? <Spinner /> : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
}
