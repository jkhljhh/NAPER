// Filename: shared.ts
// Path: @/app/(dashboard)/branch/schema/edit/
import { z } from "zod";
import { baseSchema } from "../base-schema";

export const schema = z
  .object({
    id: z.coerce.number().int().nonnegative(),
  })
  .merge(baseSchema);

export type Schema = z.infer<typeof schema>;
