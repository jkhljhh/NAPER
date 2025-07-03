// Filename: form.tsx
// Path: @/app/(dashboard)/foundation/configuration/gl-mapping/delete
"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { IconTrash } from "@tabler/icons-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ActionState } from "@/lib/action-helpers";

import { formAction } from "./action";
import { schema, type Schema } from "./shared";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PageData = {
  title: "Are you absolutely sure?",
  description:
    "This action cannot be undone. This will permanently delete the record.",
};

function F({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: { id },
  });

  function onSubmit(values: Schema) {
    startTransition(() => {
      const promise = formAction(values).then((result: ActionState) => {
        if (result.error) {
          throw new Error(result.message);
        }
        console.log(result.message)
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          className={cn(
            "text-destructive",
            "font-medium gap-1.5 text-sm flex items-center justify-start  has-[>svg]:px-2.5 [&_svg:not([class*='size-'])]:size-4",
          )}
          onSelect={(e) => e.preventDefault()}
        >
          <IconTrash className="size-4" /> Delete
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{PageData.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {PageData.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col h-full"
            >
              <AlertDialogAction type="submit" disabled={isPending}>
                Delete
              </AlertDialogAction>
            </form>
          </Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { F as Form };
