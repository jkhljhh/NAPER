// Filename: form.tsx
// Path: @/app/(dashboard)/charts-of-accounts/structure/create
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
import { fetchDepartments } from "./action";
import { useEffect } from "react";

const PageData = {
  title: "Import Master View Data",
  description: "Import master view data here. Click save when you're done.",
};

function F({ id }: { id: number }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [csvData, setCsvData] = useState<Schema[]>([]);
  const [agent, setAgent] = useState<{ name: string; dept_id?: number }>({
    name: "",
    dept_id:0,
  });
  const [departments, setDepartments] = useState<{ dept_id: number; name: string }[]>([]);

  useEffect(() => {
    async function loadDepartments() {
      try {
        const data = await fetchDepartments();
        setDepartments(data??[]);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    }

    loadDepartments();
  }, []);
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
        success: (msg) => msg || "Successful.",
        error: (err) => err.message || "Something went wrong",
      });
    });
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="h-8">
            <IconTableImport /> Import
          </Button>
        </DialogTrigger>
        <DialogContent className={cn(csvData.length > 0 ? "sm:max-w-4xl" : "sm:max-w-lg", "duration-400")}>
          <DialogHeader>
            <DialogTitle>Add Agent</DialogTitle>
            <DialogDescription>Enter agent name and map to a department.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-1">
              <label className="text-sm font-medium text-gray-700">Agent Name</label>
              <input
                className="border px-2 py-1 rounded"
                value={agent.name}
                onChange={(e) => setAgent({ ...agent, name: e.target.value })}
                placeholder="Enter agent name"
              />
            </div>

            <div className="grid gap-1">
              <label className="text-sm font-medium text-gray-700">Department</label>
              <select
                className="border px-2 py-1 rounded"
                value={agent.dept_id ?? ""}
                onChange={(e) =>
                  setAgent({
                    ...agent,
                    dept_id: e.target.value === "" ? undefined : Number(e.target.value),
                  })
                }
              >
                <option value="">Select a department</option>
                {departments.map((dept) => (
                  <option key={dept.dept_id} value={dept.dept_id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={handleRemoveFile}>Cancel</Button>
            </DialogClose>
            <Button onClick={onSubmit} disabled={isPending || !agent.name || !agent.dept_id}>
              Save Agent
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


export { F as Form };
