// Filename: shared.ts
// Path: @/app/(dashboard)/charts-of-accounts/master-view/
import { z } from "zod";

export const schema = z.object({
  entity_id: z.coerce.number().int().nonnegative(),
  name: z.string().min(1, "Name is required"),
  type: z.enum(["income", "expense", "derived"]),
  start: z.coerce.number().int().nonnegative().optional(),
  end: z.coerce.number().int().nonnegative().optional(),
  order_by: z.coerce.number().int().nonnegative(),
});

export type Schema = z.infer<typeof schema>;

export const schemaArray = z.array(schema);
export type SchemaArray = z.infer<typeof schemaArray>;
