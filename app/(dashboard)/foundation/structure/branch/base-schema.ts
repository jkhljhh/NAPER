// Filename: base-schema.ts
// Path: @/app/(dashboard)/foundation/structure/branch
import { z } from "zod";

export const baseSchema = z.object({
  code: z.string(),
  name: z.string().min(1, "Name is required"),
  city: z.string(),
  pincode: z.coerce.number().int().nonnegative(),
  state: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  type: z.enum(["retail", "mega retail", "business banking", "wealth"]),
  category: z.enum(["urban", "metro", "semi urban", "rural"]),
  region: z.enum(["north", "south", "east", "west"]),
  opening_date: z.date(),
  type_acceptance: z.string(),
  rpc_linked: z.string(),
});
