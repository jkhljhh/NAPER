// Filename: action.tsx
// Path: @/app/(dashboard)/branch/schema/create/
"use server";

import { revalidatePath } from "next/cache";
import { validatedActionWithUser } from "@/lib/action-helpers";
import { createClient } from "@/lib/supabase/server";
import { toSupabaseError } from "@/lib/supabase/error";

import { schemaArray } from "./shared";

export const formAction = validatedActionWithUser(schemaArray, async (body) => {
  try {
    const supabase = await createClient();

    const { error: insertError } = await supabase
      .from("branch_schema")
      .upsert(body, { onConflict: "code" });

    if (insertError) {
      throw toSupabaseError(insertError);
    }

    revalidatePath("/branch/structure");
    return { message: "Impored successfully." };
  } catch (err) {
    console.error(err);
    return { error: true, message: "Internal Error" };
  }
});
