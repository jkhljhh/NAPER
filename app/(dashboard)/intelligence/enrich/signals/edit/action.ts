// Filename: action.tsx
// Path: @/app/(dashboard)/intelligence/enrich/signals/edit
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
      .from("enrich_industry_factors")
      .update(updateData)
      .eq("id", id);

    if (error) {
      throw toSupabaseError(error);
    }

    revalidatePath("/charts-of-accounts/gl-mapping");
    return { message: "Record edited." };
  } catch (err) {
    console.error(err);
    return { error: true, message: "Internal Error" };
  }
});
