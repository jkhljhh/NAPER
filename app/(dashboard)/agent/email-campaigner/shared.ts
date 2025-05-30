// Filename: shared.ts
// Path: @/app/(dashboard)/agent/email-campaigner/
import { z } from "zod";

export const schema = z.object({
  company: z.string().max(255, "Company name is too long"),
  topic: z.string().min(5, "Topic is too short").max(255, "Topic is too long"),
  name: z.string(),
  segment: z.string(),
  backstory: z.string().max(400, "Backstory is too long"),
  website: z.string(),
});

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  company: "",
  topic: "",
  name: "",
  segment: "",
  backstory: "",
  website: "",
};
