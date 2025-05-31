// Filename: shared.ts
// Path: @/app/(dashboard)/foundation/market/
import { z } from "zod";

export const schema = z.object({
  language: z.string({
    required_error: "Please select a language.",
  }),

  country: z.string(),
  currency: z.string(),
});

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  language: "",
  country: "",
  currency: "",
};
