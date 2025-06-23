// Filename: base-schema.ts
// Path: @/app/(dashboard)/charts-of-accounts/gl-mapping/
import { z } from "zod";

export const baseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  month: z.enum([
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ]),
  year: z.string(),
  region_scope: z.enum(["national", "zone", "state"]),
  scope_value: z.string(),
  value: z.coerce.number().nonnegative(), // Float
  impact_direction: z.enum(["positive", "negative", "mixed"]),
  weight: z.coerce.number().nonnegative(), // Float
  type: z.enum(["macroeconomic", "monetary", "operational", "digital"]),
});
