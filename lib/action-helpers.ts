// @/lib/action-helpers
import { z } from "zod";

export type ActionState = {
  error?: boolean;
  message?: string;
  response?: string;
  [key: string]: any;
};

export function validatedAction<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: (data: z.infer<S>) => Promise<T>,
) {
  return async (_prevState: ActionState, values: z.infer<S>): Promise<T> => {
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      return { error: parsed.error.errors[0].message } as T;
    }
    return action(parsed.data);
  };
}

// type ValidatedActionWithUserFunction<S extends z.ZodType<any, any>, T> = (
//   data: z.infer<S>,
//   formData: FormData,
//   user: TODO
// ) => Promise<T>;

// export function validatedActionWithUser<S extends z.ZodType<any, any>, T>(
//   schema: S,
//   action: ValidatedActionWithUserFunction<S, T>,
// ) {
//   return async (prevState: ActionState, formData: FormData): Promise<T> => {
//     const result = schema.safeParse(Object.fromEntries(formData));
//     if (!result.success) {
//       return { error: result.error.errors[0].message } as T;
//     }

//     return action(result.data, formData);
//   };
// }
