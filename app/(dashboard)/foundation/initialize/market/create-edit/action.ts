// Filename: action.tsx
// Path: @/app/(dashboard)/foundation/initialize/market/create-edit
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
        .from("market")
        .update({
          country: body.country,
          currency: body.currency,
          fy_month: body.fy_month,
        })
        .eq("id", body.id);

      if (updateError) {
        throw toSupabaseError(updateError);
      }

      revalidatePath("/foundation/market");
      return { message: "Market updated." };
    } else {
      const { error: insertError } = await supabase.from("market").insert({
        entity_id: body.entity_id,
        country: body.country,
        currency: body.currency,
        fy_month: body.fy_month,
      });

      if (insertError) {
        throw toSupabaseError(insertError);
      }

      revalidatePath("/foundation/market");
      return { message: "Market created." };
    }
  } catch (err) {
    console.error(err);
    return { error: true, message: "Internal Error" };
  }
});
