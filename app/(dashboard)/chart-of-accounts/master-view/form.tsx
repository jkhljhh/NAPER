// Filename: form.tsx
// Path: @/app/(dashboard)/foundation/market/
"use client";

import React, { useRef, useState, useTransition } from "react";
import Papa from "papaparse";
import { z } from "zod";
import { toast } from "sonner";
import { IconTrash } from "@tabler/icons-react";
import { IconCloudUpload, IconX, IconCalendar } from "@tabler/icons-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ActionState } from "@/lib/action-helpers";
import { cn } from "@/lib/utils";

import { formAction } from "./action";
import { schema, type Schema } from "./shared";

const PageData = {
  title: "Import Master View Data",
  description: "Import master view data here. Click save when you're done.",
};

interface CsvFileUploaderProps {
  setCsvData: (data: Schema[]) => void;
  setFileName: (name: string | null) => void;
}

function CsvFileUploader({ setCsvData, setFileName }: CsvFileUploaderProps) {
  const [files, setFiles] = React.useState<File[]>([]);

  const onFileValidate = React.useCallback(
    (file: File): string | null => {
      if (files.length >= 1) {
        return "Only one file is allowed";
      }

      if (!file.name.endsWith(".csv")) {
        return "Only .csv files are allowed";
      }

      const MAX_SIZE = 2 * 1024 * 1024; // 2MB
      if (file.size > MAX_SIZE) {
        return "File size must be under 2MB";
      }

      return null;
    },
    [files],
  );

  const onFileReject = React.useCallback((file: File, message: string) => {
    toast.error(message, {
      description: `"${file.name}" could not be uploaded.`,
    });
  }, []);

  const handleFileChange = React.useCallback(
    (updatedFiles: File[]) => {
      setFiles(updatedFiles);

      if (updatedFiles.length > 0) {
        const file = updatedFiles[0];
        setFileName(file.name);

        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const data = result.data as any[];
            const validated = z.array(schema).safeParse(data);

            if (!validated.success) {
              toast.error("Invalid CSV data");
              setFiles([]); // reset files on error
              setCsvData([]);
              setFileName(null);
              return;
            }

            setCsvData(validated.data);
          },
          error: (err) => {
            console.error("Error parsing CSV:", err);
            toast.error("Error parsing CSV");
          },
        });
      } else {
        setCsvData([]);
        setFileName(null);
      }
    },
    [setCsvData, setFileName],
  );

  return (
    <FileUpload
      value={files}
      onValueChange={handleFileChange}
      onFileValidate={onFileValidate}
      onFileReject={onFileReject}
      accept=".csv"
      maxFiles={1}
      className="w-full"
    >
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center justify-center rounded-full border p-2.5">
            <IconCloudUpload className="size-6 text-muted-foreground" />
          </div>
          <p className="font-medium text-sm">Drag & drop CSV here</p>
          <p className="text-muted-foreground text-xs">
            Or click to browse (1 file, .csv only)
          </p>
        </div>
        <FileUploadTrigger asChild>
          <Button variant="outline" size="sm" className="mt-2 w-fit">
            Browse file
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>

      <FileUploadList>
        {files.map((file) => (
          <FileUploadItem key={file.name} value={file}>
            <FileUploadItemPreview />
            <FileUploadItemMetadata />
            <FileUploadItemDelete asChild>
              <Button variant="ghost" size="icon" className="size-7">
                <IconX />
              </Button>
            </FileUploadItemDelete>
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  );
}

function F() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [csvData, setCsvData] = useState<Schema[]>([]);

  const handleRemoveFile = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setCsvData([]);
    setFileName(null);
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
          <Button variant="outline">Import</Button>
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

          <CsvFileUploader setCsvData={setCsvData} setFileName={setFileName} />

          {csvData.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  {Object.keys(csvData[0]).map((header, i) => (
                    <TableHead key={i}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {csvData.map((row, i) => (
                  <TableRow key={i}>
                    {Object.keys(csvData[0]).map((key, j) => (
                      <TableCell key={j}>
                        {row[key as keyof typeof row]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={handleRemoveFile}>
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={onSubmit} disabled={isPending}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { F as Form };
