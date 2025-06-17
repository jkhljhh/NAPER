// Filename: action.tsx
// Path: @/app/(dashboard)/charts-of-accounts/structure/create
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { validatedActionWithUser } from "@/lib/action-helpers";
import { createClient } from "@/lib/supabase/server";
import { toSupabaseError } from "@/lib/supabase/error";

import { schema } from "./shared";

const schemaArray = z.array(schema);

export const formAction = validatedActionWithUser(schemaArray, async (body) => {
  try {
    const supabase = await createClient();

    const { error: insertError } = await supabase
      .from("chart_of_accounts_structure")
      .upsert(body, { onConflict: "name" });

    if (insertError) {
      throw toSupabaseError(insertError);
    }

    revalidatePath("/charts-of-accounts/structure");
    return { message: "Impored successfully." };
  } catch (err) {
    console.error(err);
    return { error: true, message: "Internal Error" };
  }
});
