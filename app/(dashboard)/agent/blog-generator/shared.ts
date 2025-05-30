// Filename: shared.ts
// Path: @/app/(dashboard)/agent/blog-generator/
import { z } from "zod";

export const schema = z.object({
  topic: z.string().min(5, "Topic is too short").max(255, "Topic is too long"),
  backstory: z.string().max(400, "Backstory is too long"),
  values: z.string(),
  wordCount: z.number().min(900).max(1000),
});

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  topic: "",
  backstory: "",
  values: "",
  wordCount: 900,
};
