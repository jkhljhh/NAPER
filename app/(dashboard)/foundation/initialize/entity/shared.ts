// Filename: shared.ts
// Path: @/app/(dashboard)/foundation/initialize/entity/create-edit
// import { z } from "zod";

// export const schema = z.object({
//   id: z.coerce.number().int().nonnegative().optional(),
//   name: z.string().min(1, "Name is required"),

// });

// export type Schema = z.infer<typeof schema>;
// shared.ts
// import { z } from "zod";

// export const schema = z.object({
//   id: z.coerce.number().int().nonnegative().optional(),
//   name: z.string().min(1, "Name is required"),
//   country: z.string().min(1, "Country is required"),
//   logo: z
//     .array(
//       z
//         .instanceof(File, { message: "Logo entry must be a File" })
//         .refine((file) => file.type.startsWith("image/"), {
//           message: "Only image files are allowed (PNG, JPG, SVG, etc.)",
//         })
//         .or(z.string()) // Allow string for existing logo URLs
//     )
//     .min(1, "Logo is required")
//     .max(1, "Only one logo allowed"),
// });
import { z } from "zod";

export const schema = z.object({
  id: z.coerce.number().int().nonnegative(), // bigint
 name: z.string().min(1, "Name is required"),
  country: z.string().optional().nullable(),
  logo: z.any().optional().nullable(),            // character varying null
});

export type Schema = z.infer<typeof schema>;



