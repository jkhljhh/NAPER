// Filename: base-schema.ts
// Path: @/app/(dashboard)/branch/schema/
import { z } from "zod";

export const baseSchema = z.object({
  code: z.string(),
  name: z.string().min(1, "Name is required"),
  city: z.string(),
  pincode: z.coerce.number().int().nonnegative(),
  state: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  type: z.preprocess(
    (val) => (typeof val === "string" ? val.toLowerCase() : val),
    z.enum(["retail", "mega retail", "business banking", "wealth"]),
  ),
  category: z.preprocess(
    (val) => (typeof val === "string" ? val.toLowerCase() : val),
    z.enum(["urban", "metro", "semi urban", "rural"]),
  ),
  region: z.preprocess(
    (val) => (typeof val === "string" ? val.toLowerCase() : val),
    z.enum(["north", "south", "east", "west"]),
  ),
  opening_date: z.preprocess((val) => {
    if (typeof val === "string" || val instanceof Date) {
      const date = new Date(val);
      return isNaN(date.getTime()) ? undefined : date;
    }
    return val;
  }, z.date()),
  type_acceptance: z.string(),
  rpc_linked: z.string(),
});
