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

export async function fetchDepartments() {
      const supabase = await createClient();
      const { data, error } = await supabase.from("department").select("dept_id,name").order("name");
      if (data) return (data);
    }

export const formAction = validatedActionWithUser(schemaArray, async (body) => {
  try{
  console.log("Creating SUPABASE CLIENT TO INTERACT WITH DB");
    const supabase = await createClient();
    console.log('CREATED...');

    const { error: insertError } = await supabase
      .from("agent_dept")//department
      .upsert(body, { onConflict: "Agent" });
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
