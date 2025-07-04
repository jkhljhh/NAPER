// Filename: base-schema.ts
// Path: @/app/(dashboard)/intelligence/enrich/signals
import { z } from "zod";

export const baseSchema = z.object({
  Agent: z.string().min(1, "Name is required"),
  Department: z.string(),
});
