// Filename: action.tsx
// Path: @/app/(dashboard)/agent/blog-generator/
"use server";

import { validatedActionWithUser } from "@/lib/action-helpers";
import { schema } from "./shared";

export const formAction = validatedActionWithUser(schema, async (body) => {
  try {
    // == API call - Example
    // const res = await fetch("http://127.0.0.1:8000/", {
    //   method: "post",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(body),
    // });
    // const data = await res.json();
    // console.log(data);

    return { success: "API CALLED" };
  } catch (err) {
    console.error(err);
    return { error: "Internal Error" };
  }
});
