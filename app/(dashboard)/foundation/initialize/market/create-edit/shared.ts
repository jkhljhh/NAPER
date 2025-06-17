// Filename: shared.ts
// Path: @/app/(dashboard)/foundation/market/
import { z } from "zod";

export const schema = z.object({
  id: z.coerce.number().int().nonnegative().optional(),
  entity_id: z.coerce.number().int().nonnegative(),
  country: z.string(),
  fy_month: z.string(),
  currency: z.string(),
});

export type Schema = z.infer<typeof schema>;
