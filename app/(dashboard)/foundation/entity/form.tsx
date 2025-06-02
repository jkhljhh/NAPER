// Filename: form.tsx
// Path: @/app/(dashboard)/foundation/entity/
"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IconCloudUpload, IconX } from "@tabler/icons-react";
import { toast } from "sonner";

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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ActionState } from "@/lib/action-helpers";

import { formAction } from "./action";
import { schema, defaultValues, type Schema } from "./shared";

const PageData = {
  title: "Edit Entity",
  description: "Make changes to your entity here. Click save when you're done.",
};

function F() {
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
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{PageData.title}</SheetTitle>
          <SheetDescription>{PageData.description}</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col h-full"
          >
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              {/*  */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} required />
                    </FormControl>
                    <FormDescription>Your organization name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/*  */}
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      <FileUpload
                        value={field.value}
                        onValueChange={field.onChange}
                        accept="image/*"
                        maxFiles={1}
                        maxSize={5 * 1024 * 1024}
                        onFileReject={(_, message) => {
                          form.setError("icon", { message });
                        }}
                        multiple={false}
                      >
                        <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
                          <IconCloudUpload className="size-4" />
                          Drag and drop or
                          <FileUploadTrigger asChild>
                            <Button variant="link" size="sm" className="p-0">
                              choose files
                            </Button>
                          </FileUploadTrigger>
                          to upload
                        </FileUploadDropzone>
                        <FileUploadList>
                          {field.value.map((file, index) => (
                            <FileUploadItem key={index} value={file}>
                              <FileUploadItemPreview />
                              <FileUploadItemMetadata />
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
            </div>
            <SheetFooter>
              <Button type="submit" disabled={isPending}>
                Save changes
              </Button>
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export { F as Form };
