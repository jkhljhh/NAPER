// Filename: form.tsx
// Path: @/app/(dashboard)/foundation/configuration/core-view/edit
"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { IconEdit } from "@tabler/icons-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ActionState } from "@/lib/action-helpers";

import { formAction } from "./action";
import { schema, type Schema } from "./shared";
import { Input } from "@/components/ui/input";
import { getEnumOptions } from "@/lib/utils";

const PageData = {
  title: "Edit Master View",
  description: "Edit Master View description",
};

function F({ data }: { data: Schema }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: data,
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
        <DropdownMenuItem
          className="font-medium gap-1.5 text-sm flex items-center justify-start  has-[>svg]:px-2.5 [&_svg:not([class*='size-'])]:size-4"
          onSelect={(e) => e.preventDefault()}
        >
          <IconEdit /> Edit
        </DropdownMenuItem>
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
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dept_ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Dept_ID"
                        type="string"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
               {/*  */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dept_Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Dept_Name" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
             
              {/*  */}
              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="desc"
                        type="string"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
             
              {/* <FormField
                // control={form.control}
                // name="type"
                // render={({ field }) => (
                //   <FormItem>
                //     <FormLabel>Type</FormLabel>
                //     <Select
                //       onValueChange={field.onChange}
                //       defaultValue={field.value}
                //     >
                //       <FormControl className="w-full">
                //         <SelectTrigger>
                //           <SelectValue />
                //         </SelectTrigger>
                //       </FormControl>
                //       <SelectContent>
                //         {getEnumOptions(schema, "type").map((item) => (
                //           <SelectItem key={item.value} value={item.value}>
                //             {item.label}
                //           </SelectItem>
                //         ))}
                //       </SelectContent>
                //     </Select>
                //     <FormMessage />
                //   </FormItem>
                // )}
              /> */}
           
              {/* <FormField
                control={form.control}
                name="end"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="End"
                        type="number"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              {/*  */}
            </div>
            {/*  */}
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
