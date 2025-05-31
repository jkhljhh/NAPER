// Filename: shared.ts
// Path: @/app/(dashboard)/foundation/finance-year/
import { z } from "zod";

export const schema = z.object({
  startDate: z.date({
    required_error: "A start date is required.",
  }),
  endDate: z.date({
    required_error: "An end date is required.",
  }),
});

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  startDate: new Date(),
  endDate: new Date(),
};
