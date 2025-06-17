// Filename: action.tsx
// Path: @/app/(dashboard)/foundation/entity/
"use server";

import { revalidatePath } from "next/cache";
import { validatedActionWithUser } from "@/lib/action-helpers";
import { createClient } from "@/lib/supabase/server";
import { toSupabaseError } from "@/lib/supabase/error";

import { schema } from "./shared";

export const formAction = validatedActionWithUser(schema, async (body) => {
  try {
    const supabase = await createClient();

    const file = body.logo[0];
    const fileExt = file.name.split(".").pop();
    const timestamp = Date.now();
    const fileName = `${timestamp}.${fileExt}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("logo")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw toSupabaseError(uploadError);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("logo").getPublicUrl(uploadData.path);

    const { error: updateError } = await supabase
      .from("entity")
      .update({
        logoUrl: publicUrl,
      })
      .eq("id", body.id);

    if (updateError) {
      throw toSupabaseError(updateError);
    }

    revalidatePath("/settings");
    return { message: "Logo uploaded" };
  } catch (err) {
    console.error(err);
    return { error: true, message: "Internal Error" };
  }
});
