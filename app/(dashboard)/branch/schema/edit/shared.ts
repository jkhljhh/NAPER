// Filename: shared.ts
// Path: @/app/(dashboard)/branch/schema/
import { z } from "zod";

export const schema = z.object({
  id: z.coerce.number().int().nonnegative(),
  code: z.string(),
  name: z.string().min(1, "Name is required"),
  city: z.string(),
  state: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  type: z.enum(["urban", "rural"]),
  zone: z.string(),
  opening_date: z.date(),
});

export type Schema = z.infer<typeof schema>;
