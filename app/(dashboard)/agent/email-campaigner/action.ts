// Filename: action.tsx
// Path: @/app/(dashboard)/agent/email-campaigner/
"use server";

import { validatedAction } from "@/lib/action-helpers";
import { schema } from "./shared";

export const agentAction = validatedAction(schema, async (data) => {
  try {
    console.debug("from server", data);
    const res = await fetch("http://127.0.0.1:8000/email-campaigner", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const mock = await res.json();
    return { success: mock.raw };
  } catch (err) {
    console.error(err);
    return { error: "Internal Error" };
  }
});
