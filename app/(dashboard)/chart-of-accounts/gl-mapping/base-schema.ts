// Filename: base-schema.ts
// Path: @/app/(dashboard)/charts-of-accounts/gl-mapping/
import { z } from "zod";

export const baseSchema = z.object({
  code: z.coerce.number().int().nonnegative(),
  pnl_head: z.string().min(1, "Name is required"),
  type: z.string(),
  description: z.string(),
});
