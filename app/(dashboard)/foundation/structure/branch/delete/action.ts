// Filename: action.tsx
// Path: @/app/(dashboard)/foundation/structure/branch/delete
"use server";

import { revalidatePath } from "next/cache";
import { validatedActionWithUser } from "@/lib/action-helpers";
import { createClient } from "@/lib/supabase/server";
import { toSupabaseError } from "@/lib/supabase/error";

import { schema } from "./shared";

export const formAction = validatedActionWithUser(schema, async (body) => {
  try {
    const supabase = await createClient();

    const { error: deleteError } = await supabase
      .from("branch_schema")
      .delete()
      .eq("id", body.id);

    if (deleteError) {
      throw toSupabaseError(deleteError);
    }

    revalidatePath("/branch/structure");
    return { message: "Record deleted." };
  } catch (err) {
    console.error(err);
    return { error: true, message: "Internal Error" };
  }
});
