// Filename: shared.ts
// Path: @/app/(dashboard)/foundation/structure/branch/delete
import { z } from "zod";

export const schema = z.object({
  id: z.coerce.number().int().nonnegative(),
});

export type Schema = z.infer<typeof schema>;
