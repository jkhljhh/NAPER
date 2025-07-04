// Filename: form.tsx
// Path: @/app/(dashboard)/foundation/configuration/gl-mapping/create
"use client";

import React, { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { IconTableImport } from "@tabler/icons-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"; 
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
import { getEntities } from "./action";
import { useEffect } from "react";

const PageData = {
  title: "Import Master View Data",
  description: "Import master view data here. Click save when you're done.",
};

function ManualEntryForm({ onAdd }: { onAdd: (row: Schema) => void }) {
  const [entry, setEntry] = useState<Schema>({
    entity_id: 0,
    department: "",
    name: "",
    user_id: 0,
    id:0,
    email:"",
  });

   const [entities, setEntities] = useState<{ id: number; name: string }[]>([]);
    useEffect(() => {
    getEntities().then(setEntities).catch(console.error);
  }, []);

  const handleChange = (key: keyof Schema, value: any) => {
    setEntry((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!entry.name || !entry.department) return;
    onAdd(entry);
    setEntry({ entity_id: 0, department: "", name: "", user_id: 0 ,id:0, email:""});
  };
// const departments = [
//   { id: 1, name: "BI" },
//   { id: 2, name: "HR" },
//   { id: 3, name: "QA" },
//   { id: 4, name: "Finance" },
// ];

  return (
    <div className="grid gap-4 mb-4">
      {/* <div className="grid gap-1">
        <label className="text-sm font-medium text-gray-700">Entity ID</label>
        <input
          className="border px-2 py-1 rounded"
          type="number"
          value={entry.id??""}
          onChange={(e) =>
            handleChange("id", e.target.value === "" ? 0 : Number(e.target.value))
          }
        />
      </div> */}

<div className="grid gap-1">
  <label className="text-sm font-medium text-gray-700">Department</label>
  <select
    className="border px-2 py-1 rounded"
    value={entry.department ?? ""}
    onChange={(e) =>
      handleChange("department", e.target.value === "" ? "" : e.target.value)
    }
  >
     <option value="">Select an entity</option>
          {entities.map((entity) => (
            <option key={entity.id} value={entity.id}>
              {entity.name}
            </option>
    ))}
  </select>
</div>

      <div className="grid gap-1">
        <label className="text-sm font-medium text-gray-700">Name</label>
        <input
          className="border px-2 py-1 rounded"
          type="text"
          value={entry.name ?? ""}              // {/* always supply a string */}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>
      <div className="grid gap-1">
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input
          className="border px-2 py-1 rounded"
          type="email"                           //{/* semantic input type */}
          value={entry.email ?? ""}               //{/* convert null/undefined → "" */}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </div>
      <div className="grid gap-1">
        <label className="text-sm font-medium text-gray-700">User_ID</label>
        <input
          className="border px-2 py-1 rounded"
          type="number"
          value={entry.user_id}
          onChange={(e) => handleChange("user_id", e.target.value)}
        />
      </div>

      <Button onClick={handleSubmit}>Add Row</Button>
    </div>
  );
}

function F({ id }: { id: number }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [csvData, setCsvData] = useState<Schema[]>([]);
   const [open, setOpen] = useState(false);

  const handleRemoveFile = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setCsvData([]);
  };
   const handleAddManualRow = (row: Schema) => {
      setCsvData((prev) => [...prev, row]);
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
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            setCsvData([]);
            if (inputRef.current) inputRef.current.value = "";
          }
        }}
      >
        <DialogTrigger asChild>
          <Button variant="outline" className="h-8">
            <IconTableImport />
            ADD
          </Button>
        </DialogTrigger>

        <DialogContent
          className={cn(
            csvData.length > 0 ? "sm:max-w-4xl" : "sm:max-w-lg",
            "duration-400"
          )}
        >
          <DialogHeader>
            <DialogTitle>{PageData.title}</DialogTitle>
            <DialogDescription>{PageData.description}</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="csv" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="csv">Upload CSV</TabsTrigger>
              <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            </TabsList>

            <TabsContent value="csv">
              <CsvUpload
                id={id}
                schema={schema}
                setCsvData={setCsvData}
                hasData={csvData.length !== 0}
              />
            </TabsContent>

            <TabsContent value="manual">
              <ManualEntryForm onAdd={handleAddManualRow} />
            </TabsContent>
          </Tabs>

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
