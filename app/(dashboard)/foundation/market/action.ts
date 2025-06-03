// Filename: action.tsx
// Path: @/app/(dashboard)/foundation/market/
"use server";

import { revalidatePath } from "next/cache";
import { validatedActionWithUser } from "@/lib/action-helpers";
import { createClient } from "@/lib/supabase/server";
import { toSupabaseError } from "@/lib/supabase/error";

import { schema } from "./shared";

export const formAction = validatedActionWithUser(schema, async (body) => {
  try {
    const supabase = await createClient();

    const { error: insertError } = await supabase
      .from("market")
      .insert({ country: body.country, currency: body.currency, entity_id: 7 });

    if (insertError) {
      throw toSupabaseError(insertError);
    }

    revalidatePath("/foundation/market");
    return { message: "Market created." };
  } catch (err) {
    console.error(err);
    return { error: true, message: "Internal Error" };
  }
});
