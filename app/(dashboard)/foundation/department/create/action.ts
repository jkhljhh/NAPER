// Filename: action.tsx
// Path: @/app/(dashboard)/foundation/configuration/core-view/create
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { validatedActionWithUser } from "@/lib/action-helpers";
import { createClient } from "@/lib/supabase/server";
import { toSupabaseError } from "@/lib/supabase/error";

import { schema } from "./shared";
import { Console } from "console";

const schemaArray = z.array(schema);

export const formAction = validatedActionWithUser(schemaArray, async (body) => {
  console.log("Received Data",body);
  try {
    console.log("Creating SUPABASE CLIENT TO INTERACT WITH DB");
    const supabase = await createClient();
    console.log('CREATED...');

    const { error: insertError } = await supabase
      .from("department")//department
      .upsert(body, { onConflict: "dept_id" });
      console.log("data updated")

    if (insertError) {
      throw toSupabaseError(insertError);
    }
    
    console.log("Revalidating...")
    revalidatePath("/department/structure");//department
    return { message: "Imported successfully." };
  } catch (err) {
    console.error(err);
    return { error: true, message: "Internal Error" };
  }
});
