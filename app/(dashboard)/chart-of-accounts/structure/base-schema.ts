// Filename: base-schema.ts
// Path: @/app/(dashboard)/charts-of-accounts/structure/
import { z } from "zod";

export const baseSchema = z.object({
  order_by: z.coerce.number().int().nonnegative(),
  name: z.string().min(1, "Name is required"),
  type: z.enum(["income", "expense", "derived"]),
  start: z.coerce.number().int().nonnegative(),
  end: z.coerce.number().int().nonnegative(),
});
