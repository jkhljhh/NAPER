// Filename: form.tsx
// Path: @/app/(dashboard)/foundation/initialize/entity/upload-logo
"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IconCloudUpload, IconX, IconCalendar } from "@tabler/icons-react";
import { toast } from "sonner";
import { format } from "date-fns";

import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ActionState } from "@/lib/action-helpers";
import { cn } from "@/lib/utils";

import { formAction } from "./action";
import { schema, type Schema } from "./shared";

function F({ defaultValues }: { defaultValues: Schema }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid flex-1 auto-rows-min gap-6 px-4"
      >
        {/*  */}
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value}
                  onValueChange={field.onChange}
                  accept="image/*"
                  maxFiles={1}
                  maxSize={5 * 1024 * 1024}
                  onFileReject={(_, message) => {
                    form.setError("logo", { message });
                  }}
                  multiple={false}
                >
                  <FileUploadDropzone>
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center justify-center rounded-full border p-2.5">
                        <IconCloudUpload className="size-6 text-muted-foreground" />
                      </div>
                      <p className="font-medium text-sm">
                        Drag & drop Image here
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Or click to browse
                      </p>
                    </div>
                    <FileUploadTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 w-fit"
                      >
                        Browse images
                      </Button>
                    </FileUploadTrigger>
                  </FileUploadDropzone>
                  <FileUploadList>
                    {field.value.map((file, index) => (
                      <FileUploadItem key={index} value={file}>
                        {typeof file === "string" ? (
                          <div className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded border bg-accent/50">
                            <img
                              src={file} // your URL here
                              alt="Current logo"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <>
                            <FileUploadItemPreview />
                            <FileUploadItemMetadata />
                          </>
                        )}
                        <FileUploadItemDelete asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7"
                          >
                            <IconX />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </FileUploadItemDelete>
                      </FileUploadItem>
                    ))}
                  </FileUploadList>
                </FileUpload>
              </FormControl>
              <FormDescription>Upload image up to 5MB.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/*  */}
        <Button type="submit" disabled={isPending} className="w-30">
          Upload
        </Button>
      </form>
    </Form>
  );
}

export { F as Form };
