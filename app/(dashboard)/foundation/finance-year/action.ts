// Filename: action.tsx
// Path: @/app/(dashboard)/foundation/finance-year/
"use server";

import { validatedActionWithUser } from "@/lib/action-helpers";

import { schema } from "./shared";

export const formAction = validatedActionWithUser(schema, async (body) => {
  try {
    return { message: JSON.stringify(body) };
  } catch (err) {
    console.error(err);
    return { error: true, message: "Internal Error" };
  }
});
