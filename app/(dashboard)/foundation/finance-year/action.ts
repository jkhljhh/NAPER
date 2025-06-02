// Filename: action.tsx
// Path: @/app/(dashboard)/foundation/finance-year/
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
      .from("entity")
      .update({
        start_date: body.startDate,
        end_date: body.endDate,
      })
      .eq("id", 6);

    if (insertError) {
      throw toSupabaseError(insertError);
    }

    revalidatePath("/foundation/finance-year");
    return { message: "Year updated." };
  } catch (err) {
    console.error(err);
    return { error: true, message: "Internal Error" };
  }
});
