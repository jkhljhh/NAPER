// Filename: form.tsx
// Path: @/app/(dashboard)/foundation/configuration/core-view/create
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

const PageData = {
  title: "Import Master View Data",
  description: "Import master view data here. Click save when you're done.",
};
function ManualEntryForm({ onAdd }: { onAdd: (row: Schema) => void }) {
  const [entry, setEntry] = useState<Schema>({
    entity_id: undefined as unknown as number,
    dept_id: undefined as unknown as number,
    name: "",
    desc: "",
  });

  const handleChange = (key: keyof Schema, value: any) => {
    setEntry((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!entry.name || !entry.dept_id) return;
    onAdd(entry);
    setEntry({ entity_id: 0, dept_id: 0, name: "", desc: "" });
  };

 const entities = [
  { id: 1, name: "Americana" },
  { id: 2, name: "Domino" },
  { id: 3, name: "KFC" },
  { id: 4, name: "Pizza Hut" },
];

return (
  <div className="grid gap-4 mb-4">
    {/* Entity Dropdown */}
    <div className="grid gap-1">
      <label className="text-sm font-medium text-gray-700">Entity</label>
      <select
        className="border px-2 py-1 rounded"
        value={entry.entity_id ?? ""}
        onChange={(e) =>
          handleChange(
            "entity_id",
            e.target.value === "" ? undefined : Number(e.target.value)
          )
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

    {/* Dept ID Input */}
    <div className="grid gap-1">
      <label className="text-sm font-medium text-gray-700">Dept ID</label>
      <input
        className="border px-2 py-1 rounded"
        type="number"
        value={entry.dept_id ?? ""}
        onChange={(e) =>
          handleChange(
            "dept_id",
            e.target.value === "" ? undefined : Number(e.target.value)
          )
        }
      />
    </div>

    {/* Name Input */}
    <div className="grid gap-1">
      <label className="text-sm font-medium text-gray-700">Name</label>
      <input
        className="border px-2 py-1 rounded"
        type="text"
        value={entry.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
    </div>

    {/* Description Input */}
    <div className="grid gap-1">
      <label className="text-sm font-medium text-gray-700">Description</label>
      <input
        className="border px-2 py-1 rounded"
        type="text"
        value={entry.desc}
        onChange={(e) => handleChange("desc", e.target.value)}
      />
    </div>

    <Button onClick={handleSubmit}>Add Row</Button>
  </div>
);

}

export function F({ id }: { id: number }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [csvData, setCsvData] = useState<Schema[]>([]);
  const [open, setOpen] = useState(false); // 🆕

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
        success: (msg) => msg || "Successful.",
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

// function F({ id }: { id: number }) {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [isPending, startTransition] = useTransition();
//   const [csvData, setCsvData] = useState<Schema[]>([]);

//   const handleRemoveFile = () => {
//     if (inputRef.current) {
//       inputRef.current.value = "";
//     }
//     setCsvData([]);
//   };

//   function onSubmit() {
//     startTransition(() => {
//       const promise = formAction(csvData).then((result: ActionState) => {
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
//     <div>
//       <Dialog>
//         <DialogTrigger asChild>
//           <Button variant="outline" className="h-8">
//             <IconTableImport />
//             ADD
//           </Button>
//         </DialogTrigger>
//         <DialogContent
//           className={cn(
//             csvData.length > 0 ? "sm:max-w-4xl" : "sm:max-w-lg",
//             "duration-400",
//           )}
//         >
//           <DialogHeader>
//             <DialogTitle>{PageData.title}</DialogTitle>
//             <DialogDescription>{PageData.description}</DialogDescription>
//           </DialogHeader>

//           <CsvUpload
//             id={id}
//             schema={schema}
//             setCsvData={setCsvData}
//             hasData={csvData.length !== 0}
//           />
//           <CsvPreviewTable data={csvData} />

//           <DialogFooter>
//             <DialogClose asChild>
//               <Button variant="outline" onClick={handleRemoveFile}>
//                 Cancel
//               </Button>
//             </DialogClose>
//             <Button
//               onClick={onSubmit}
//               disabled={csvData.length === 0 || isPending}
//             >
//               Import
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }


