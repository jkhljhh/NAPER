// Filename: utils.ts
// Path: @/lib/

import { z, ZodObject, ZodEnum, ZodEffects, ZodTypeAny } from "zod";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getEnumOptions<T extends ZodObject<any>>(
  schema: T,
  key: keyof z.infer<T>,
): { label: string; value: string }[] {
  const shape = schema.shape;
  const field: ZodTypeAny = shape[key];

  // Unwrap ZodEffects if preprocess is used
  const enumSchema =
    field instanceof ZodEffects ? (field._def.schema as ZodTypeAny) : field;

  if (enumSchema instanceof ZodEnum) {
    return enumSchema.options.map((value: string) => ({
      value,
      label: value
        .split(" ")
        .map((w: string) => w[0].toUpperCase() + w.slice(1))
        .join(" "),
    }));
  }

  throw new Error(`Field "${String(key)}" is not a ZodEnum.`);
}
