// Filename: base-schema.ts
// Path: @/app/(dashboard)/foundation/configuration/core-view
// import { z } from "zod";

// export const baseSchema = z.object({
//   order_by: z.coerce.number().int().nonnegative(),
//   name: z.string().min(0, "Name is required"),
//   type: z.enum(["income", "expense", "derived"]),
//   start: z.coerce.number().int().nonnegative(),
//   end: z.coerce.number().int().nonnegative(),
// });

//DEPPARTMENT
import { z } from 'zod';

export const baseSchema = z.object({
  id: z.coerce.number().int().nonnegative(),
  name: z.string().min(0, "Name is required"),
  desc: z.string().min(0, "Description is required"),
});
