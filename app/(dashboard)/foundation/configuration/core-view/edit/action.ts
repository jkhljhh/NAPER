// Filename: action.tsx
// Path: @/app/(dashboard)/foundation/configuration/core-view/edit
"use server";

import { revalidatePath } from "next/cache";
import { validatedActionWithUser } from "@/lib/action-helpers";
import { createClient } from "@/lib/supabase/server";
import { toSupabaseError } from "@/lib/supabase/error";

import { schema } from "./shared";

export const formAction = validatedActionWithUser(schema, async (body) => {
  try {
    const supabase = await createClient();

    const { id, ...updateData } = body;

    const { error } = await supabase
      .from("chart_of_accounts_structure")
      .update(updateData)
      .eq("id", id);

    if (error) {
      throw toSupabaseError(error);
    }

    revalidatePath("/charts-of-accounts/structure");
    return { message: "Record edited." };
  } catch (err) {
    console.error(err);
    return { error: true, message: "Internal Error" };
  }
});
