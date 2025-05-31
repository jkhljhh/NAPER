// Filename: shared.ts
// Path: @/app/(dashboard)/foundation/market/
import { z } from "zod";

export const schema = z.object({
  country: z.string(),
  currency: z.string(),
});

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  country: "",
  currency: "",
};
