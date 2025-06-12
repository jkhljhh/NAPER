// Filename: utils.ts
// Path: @/lib/

import { z, ZodObject, ZodEnum, ZodEffects, ZodTypeAny } from "zod";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getEnumOptions<
  T extends ZodObject<Record<string, ZodTypeAny>>,
  K extends keyof z.infer<T>,
>(schema: T, key: K): { label: string; value: string }[] {
  const shape = schema.shape as Record<string, ZodTypeAny>;
  const field = shape[key as string];

  // Unwrap preprocess or other effects
  const inner = field instanceof ZodEffects ? field.innerType() : field;

  if (inner instanceof ZodEnum) {
    return inner.options.map((value: string) => ({
      value,
      label: value
        .split(" ")
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(" "),
    }));
  }

  throw new Error(`Field "${String(key)}" is not a ZodEnum.`);
}
