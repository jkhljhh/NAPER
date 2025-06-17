// Filename: shared.ts
// Path: @/app/(dashboard)/foundation/entity/
import { z } from "zod";

export const schema = z.object({
  id: z.coerce.number().int().nonnegative().optional(),
  name: z.string().min(1, "Name is required"),
});

export type Schema = z.infer<typeof schema>;
