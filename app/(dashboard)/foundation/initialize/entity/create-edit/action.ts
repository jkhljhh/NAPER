// Filename: action.tsx
// Path: @/app/(dashboard)/foundation/initialize/entity/create-edit
"use server";

import { revalidatePath } from "next/cache";
import { validatedActionWithUser } from "@/lib/action-helpers";
import { createClient } from "@/lib/supabase/server";
import { toSupabaseError } from "@/lib/supabase/error";

import { schema } from "./shared";

export const formAction = validatedActionWithUser(schema, async (body) => {
  try {
    const supabase = await createClient();

    if (body.id) {
      const { error: updateError } = await supabase
        .from("entity")
        .update({
          name: body.name,
        })
        .eq("id", body.id);

      if (updateError) throw toSupabaseError(updateError);

      revalidatePath("/settings");
      return { message: "Entity updated" };
    } else {
      const { error: insertError } = await supabase
        //
        .from("entity")
        .insert({
          name: body.name,
        });

      if (insertError) throw toSupabaseError(insertError);

      revalidatePath("/settings");
      return { message: "Entity created" };
    }
  } catch (err) {
    console.error(err);
    return { error: true, message: "Internal Error" };
  }
});
