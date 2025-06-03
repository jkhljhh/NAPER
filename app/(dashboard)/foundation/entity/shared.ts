// Filename: shared.ts
// Path: @/app/(dashboard)/foundation/entity/
import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1, "Name is required"),
  icon: z
    .array(
      z
        .instanceof(File, { message: "Each icon entry must be a File" })
        .refine((file) => file.type.startsWith("image/"), {
          message: "Only image files are allowed (PNG, JPG, SVG, etc.)",
        }),
    )
    .min(1, "Icon is required")
    .max(1, "Only one icon allowed"),
  startDate: z.date({
    required_error: "A start date is required.",
  }),
  endDate: z.date({
    required_error: "An end date is required.",
  }),
});

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  name: "",
  icon: [],
  startDate: new Date(),
  endDate: new Date(),
};
