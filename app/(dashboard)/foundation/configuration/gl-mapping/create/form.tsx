// Filename: form.tsx
// Path: @/app/(dashboard)/foundation/configuration/gl-mapping/create
"use client";

import React, { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { IconTableImport } from "@tabler/icons-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { CsvPreviewTable, CsvUpload } from "@/components/csv-upload";
import { ActionState } from "@/lib/action-helpers";
import { cn } from "@/lib/utils";

import { formAction } from "./action";
import { schema, type Schema } from "./shared";

const PageData = {
  title: "Import Master View Data",
  description: "Import master view data here. Click save when you're done.",
};

function F({ id }: { id: number }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [csvData, setCsvData] = useState<Schema[]>([]);

  const handleRemoveFile = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setCsvData([]);
  };

  function onSubmit() {
    startTransition(() => {
      const promise = formAction(csvData).then((result: ActionState) => {
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
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="h-8">
            <IconTableImport />
            Import
          </Button>
        </DialogTrigger>
        <DialogContent
          className={cn(
            csvData.length > 0 ? "sm:max-w-4xl" : "sm:max-w-lg",
            "duration-400",
          )}
        >
          <DialogHeader>
            <DialogTitle>{PageData.title}</DialogTitle>
            <DialogDescription>{PageData.description}</DialogDescription>
          </DialogHeader>

          <CsvUpload
            id={id}
            schema={schema}
            setCsvData={setCsvData}
            hasData={csvData.length !== 0}
          />
          <CsvPreviewTable data={csvData} />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={handleRemoveFile}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={onSubmit}
              disabled={csvData.length === 0 || isPending}
            >
              Import
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { F as Form };
