// Filename: form.tsx
// Path: @/app/(dashboard)/agent/blog-generator/
"use client";

import { startTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { schema, defaultValues, type Schema } from "./shared";
import { Spinner } from "@/components/ui/spinner";

type FormProps = {
  action: (payload: Schema) => void;
  pending: boolean;
};

export function AgentForm({ action, pending }: FormProps) {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic</FormLabel>
              <FormControl>
                <Input placeholder="Enter topic" {...field} />
              </FormControl>
              <FormDescription>A short and clear topic title.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="backstory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Backstory</FormLabel>
              <FormControl>
                <Textarea placeholder="Optional backstory..." {...field} />
              </FormControl>
              <FormDescription>
                Context for the topic (max 400 characters).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="values"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Values</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Comma-separated values or tags"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                What should be emphasized in the output?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="wordCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Word Count</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 900" {...field} />
              </FormControl>
              <FormDescription>
                Word count must be between 900 and 1000.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={pending}>
          {pending ? <Spinner /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
