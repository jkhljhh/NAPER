// // Filename: form.tsx
// // Path: @/app/(dashboard)/foundation/initialize/entity/create-edit
// "use client";

// import { useTransition } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";

// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { ActionState } from "@/lib/action-helpers";

// import { formAction } from "./action";
// import { schema, type Schema } from "./shared";

// function F({ defaultValues }: { defaultValues: Schema }) {
//   const [isPending, startTransition] = useTransition();

//   const form = useForm<Schema>({
//     resolver: zodResolver(schema),
//     defaultValues: defaultValues,
//   });

//   function onSubmit(values: Schema) {
//     startTransition(() => {
//       const promise = formAction(values).then((result: ActionState) => {
//         if (result.error) {
//           throw new Error(result.message);
//         }

//         return result.message;
//       });

//       toast.promise(promise, {
//         loading: "Loading...",
//         success: (msg) => msg || "Successfull.",
//         error: (err) => err.message || "Something went wrong",
//       });
//     });
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="grid flex-1 auto-rows-min gap-6 px-4"
//       >
//         {/*  */}
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="Name" {...field} required />
//               </FormControl>
//               <FormDescription>Your organization name.</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         {/*  */}
//         <Button type="submit" disabled={isPending} className="w-30">
//           Save changes
//         </Button>
//       </form>
//     </Form>
//   );
// }

// export { F as Form };
// form.tsx
"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  IconCheck,
  IconSelector,
  IconCloudUpload,
  IconX,
} from "@tabler/icons-react";
import { toast } from "sonner";
import ReactCountryFlag from "react-country-flag";

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
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ActionState } from "@/lib/action-helpers";
import { cn } from "@/lib/utils";

import { formAction } from "./action";
import { schema, type Schema } from "./shared";
import countries from "./countries.json";

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
        success: (msg) => msg || "Successful.",
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
      {/* Name Field */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Organization Name</FormLabel>
            <FormControl>
              <Input placeholder="Name" {...field} required />
            </FormControl>
            <FormDescription>Your organization's name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Country Field */}
      <FormField
        control={form.control}
        name="country"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Country</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      <span className="items-center justify-center flex">
                        <ReactCountryFlag
                          countryCode={field.value}
                          style={{ width: "2em", marginRight: "0.5em" }}
                          svg
                        />
                        {
                          countries.find(
                            (country) => country.code === field.value
                          )?.name
                        }
                      </span>
                    ) : (
                      "Select country"
                    )}
                    <IconSelector className="opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search country..."
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup>
                      {countries.map((country) => (
                        <CommandItem
                          value={country.name}
                          key={country.code}
                          onSelect={() => {
                            form.setValue("country", country.code);
                          }}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <ReactCountryFlag
                              countryCode={country.code}
                              style={{ width: "2em" }}
                              svg
                            />
                            {country.name}
                          </div>
                          <IconCheck
                            className={cn(
                              "ml-auto",
                              country.code === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormDescription>
              Select your organization's primary country.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Logo Upload */}
      <FormField
  control={form.control}
  name="logo"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Logo</FormLabel>
      <FormControl>
        <FileUpload
          value={
            Array.isArray(field.value)
              ? (field.value.filter((f) => f instanceof File) as File[])
              : undefined
          }
          onValueChange={(value) => {
            form.clearErrors("logo");
            field.onChange(value);
          }}
          accept="image/*"
          maxFiles={1}
          maxSize={5 * 1024 * 1024}
          onFileReject={(_, message) => {
            form.setError("logo", { message });
          }}
          multiple={false}
        >
          {/* Dropzone */}
          {/* <FileUploadDropzone>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center justify-center rounded-full border p-2.5">
                <IconCloudUpload className="size-6 text-muted-foreground" />
              </div>
              <p className="font-medium text-sm">Drag & drop image here</p>
              <p className="text-muted-foreground text-xs">
                Or click to browse
              </p>
            </div>
          </FileUploadDropzone> */}

          {/* Browse button - moved outside dropzone */}
          <FileUploadTrigger asChild>
            <Button variant="outline" size="sm" className="mt-2 w-fit">
              Browse image
            </Button>
          </FileUploadTrigger>

          {/* File preview */}
          <FileUploadList>
            {field.value?.map((file: any, index: number) => (
              <FileUploadItem key={index} value={file}>
                {typeof file === "string" ? (
                  <div className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded border bg-accent/50">
                    <img
                      src={file}
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
                  <Button variant="ghost" size="icon" className="size-7">
                    <IconX />
                    <span className="sr-only">Delete</span>
                  </Button>
                </FileUploadItemDelete>
              </FileUploadItem>
            ))}
          </FileUploadList>
        </FileUpload>
      </FormControl>
      <FormDescription>
        Upload your organization’s logo (up to 5MB).
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>


      <Button type="submit" disabled={isPending} className="w-30">
        Save Changes
      </Button>
    </form>
  </Form>
);

}

export { F as Form };
