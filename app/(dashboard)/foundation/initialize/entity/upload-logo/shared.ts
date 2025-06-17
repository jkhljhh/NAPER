// Filename: shared.ts
// Path: @/app/(dashboard)/foundation/entity/
import { z } from "zod";

export const schema = z.object({
  id: z.coerce.number().int().nonnegative(),
  logo: z
    .array(
      z
        .instanceof(File, { message: "Logo entry must be a File" })
        .refine((file) => file.type.startsWith("image/"), {
          message: "Only image files are allowed (PNG, JPG, SVG, etc.)",
        }),
    )
    .min(1, "Logo is required")
    .max(1, "Only one logo allowed"),
});

export type Schema = z.infer<typeof schema>;
