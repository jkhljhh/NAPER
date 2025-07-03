// // Filename: action.tsx
// // Path: @/app/(dashboard)/foundation/initialize/entity/create-edit
// "use server";

// import { revalidatePath } from "next/cache";
// import { validatedActionWithUser } from "@/lib/action-helpers";
// import { createClient } from "@/lib/supabase/server";
// import { toSupabaseError } from "@/lib/supabase/error";

// import { schema } from "./shared";

// export const formAction = validatedActionWithUser(schema, async (body) => {
//   try {
//     const supabase = await createClient();

//     if (body.id) {
//       const { error: updateError } = await supabase
//         .from("entity")
//         .update({
//           name: body.name,
//         })
//         .eq("id", body.id);

//       if (updateError) throw toSupabaseError(updateError);

//       revalidatePath("/settings");
//       return { message: "Entity updated" };
//     } else {
//       const { error: insertError } = await supabase
//         //
//         .from("entity")
//         .insert({
//           name: body.name,
//         });

//       if (insertError) throw toSupabaseError(insertError);

//       revalidatePath("/settings");
//       return { message: "Entity created" };
//     }
//   } catch (err) {
//     console.error(err);
//     return { error: true, message: "Internal Error" };
//   }
// });
// action.ts
"use server";

import { revalidatePath } from "next/cache";
import { validatedActionWithUser } from "@/lib/action-helpers";
import { createClient } from "@/lib/supabase/server";
import { toSupabaseError } from "@/lib/supabase/error";

import { schema } from "./shared";

export const formAction = validatedActionWithUser(schema, async (body) => {
  try {
    const supabase = await createClient();

    // Handle logo upload if it's a File object
    let logoUrl = body.logo[0];
    if (typeof logoUrl !== "string") {
      // Type guard to ensure logoUrl is File
      const file = body.logo[0] as File; // Explicit type assertion
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
      logoUrl = publicUrl;
    }

    if (body.id) {
      // Update existing entity and market
      const { error: entityError } = await supabase
        .from("entity")
        .update({
          name: body.name,
          logoUrl: logoUrl,
        })
        .eq("id", body.id);

      if (entityError) throw toSupabaseError(entityError);

      const { error: marketError } = await supabase
        .from("entity")
        .update({
          country: body.country,
        })
        .eq("entity_id", body.id);

      if (marketError) throw toSupabaseError(marketError);

      revalidatePath("/settings");
      return { message: "Organization updated" };
    } else {
      // Create new entity and market
      const { data: entityData, error: entityError } = await supabase
        .from("entity")
        .insert({
          name: body.name,
          logoUrl: logoUrl,
        })
        .select()
        .single();

      if (entityError) throw toSupabaseError(entityError);

      const { error: marketError } = await supabase.from("entity").insert({
        entity_id: entityData.id,
        country: body.country,
      });

      if (marketError) throw toSupabaseError(marketError);

      revalidatePath("/settings");
      return { message: "Organization created" };
    }
  } catch (err) {
    console.error(err);
    return { error: true, message: "Internal Error" };
  }
});
