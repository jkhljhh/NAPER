import React from "react";
import Papa from "papaparse";

import { toast } from "sonner";
import { IconCloudUpload, IconX } from "@tabler/icons-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Button } from "@/components/ui/button";

import { ZodObject, ZodRawShape, z } from "zod";

type Props<T extends ZodRawShape> = {
  id: number;
  schema: ZodObject<T>;
  setCsvData: (data: z.infer<ZodObject<T>>[]) => void;
};

export function CsvUpload<T extends ZodRawShape>({
  setCsvData,
  id,
  schema,
}: Props<T>) {
  const [files, setFiles] = React.useState<File[]>([]);

  const onFileValidate = React.useCallback(
    (file: File): string | null => {
      if (files.length >= 1) return "Only one file is allowed";
      if (!file.name.endsWith(".csv")) return "Only .csv files are allowed";
      if (file.size > 2 * 1024 * 1024) return "File size must be under 2MB";
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

        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const parsed = result.data as T[];

            const dataWithEntity = parsed.map((row: T) => ({
              ...row,
              entity_id: id,
            }));

            const validated = z.array(schema).safeParse(dataWithEntity);

            if (!validated.success) {
              console.error(validated.error);
              toast.error("Invalid CSV data");
              setFiles([]);
              setCsvData([]);
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
      }
    },
    [schema, setCsvData, id],
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

type CsvPreviewTableProps<T extends Record<string, any>> = {
  data: T[];
};

export function CsvPreviewTable<T extends Record<string, any>>({
  data,
}: CsvPreviewTableProps<T>) {
  if (!data || data.length === 0) return null;

  const headers = Object.keys(data[0]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header, i) => (
            <TableHead key={i}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i}>
            {headers.map((key, j) => (
              <TableCell key={j}>
                {row[key] instanceof Date
                  ? row[key].toLocaleDateString()
                  : String(row[key])}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
