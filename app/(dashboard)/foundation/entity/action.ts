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

    const file = body.icon[0];
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

    const { error: insertError } = await supabase
      .from("entity")
      .insert([{ name: body.name, iconUrl: publicUrl }]);

    if (insertError) {
      throw toSupabaseError(insertError);
    }

    revalidatePath("/foundation/entity");
    return { message: "Entity created" };
  } catch (err) {
    console.error(err);
    return { error: true, message: "Internal Error" };
  }
});
