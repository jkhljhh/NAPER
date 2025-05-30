// Filename: shared.ts
// Path: @/app/(dashboard)/agent/blog-generator/
import { z } from "zod";

export const schema = z.object({
  name: z.string(),
  icon: z
    .array(z.custom<File>())
    .min(1, "Please select one file")
    .max(1, "Please select one file")
    .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
      message: "File size must be less than 5MB",
      path: ["files"],
    }),
});

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  name: "",
  icon: [],
};
