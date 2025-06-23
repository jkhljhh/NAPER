// Filename: action.tsx
// Path: @/app/(dashboard)/foundation/configuration/gl-mapping/create
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
      .from("chart_of_accounts_gl_mapping")
      .upsert(body, { onConflict: "code" });

    if (insertError) {
      throw toSupabaseError(insertError);
    }

    revalidatePath("/charts-of-accounts/gl-mapping");
    return { message: "Impored successfully." };
  } catch (err) {
    console.error(err);
    return { error: true, message: "Internal Error" };
  }
});
