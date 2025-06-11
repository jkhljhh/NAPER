// Filename: shared.ts
// Path: @/app/(dashboard)/branch/schema/create/
import { z } from "zod";

export const schema = z.object({
  entity_id: z.coerce.number().int().nonnegative(),
  code: z.string(),
  name: z.string().min(1, "Name is required"),
  city: z.string(),
  state: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  type: z.preprocess(
    (val) => (typeof val === "string" ? val.toLowerCase() : val),
    z.enum(["urban", "rural"]),
  ),
  zone: z.string(),
  opening_date: z.preprocess((val) => {
    if (typeof val === "string" || val instanceof Date) {
      const date = new Date(val);
      return isNaN(date.getTime()) ? undefined : date;
    }
    return val;
  }, z.date()),
});

export type Schema = z.infer<typeof schema>;

export const schemaArray = z.array(schema);
export type SchemaArray = z.infer<typeof schemaArray>;
