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

// export const formAction = validatedActionWithUser(schema, async (body) => {
//   try {
//     const supabase = await createClient();

//     // Handle logo upload if it's a File object
//    let logoUrl = body.logo;

// if (
//   Array.isArray(logoUrl) &&
//   logoUrl.length > 0 &&
//   logoUrl[0] instanceof File &&
//   logoUrl[0]?.name
// ) {
//   const file = logoUrl[0];
//   const fileExt = file.name.split(".").pop() ?? "bin";
//   const fileName = `${Date.now()}.${fileExt}`;

//   const { data: uploadData, error: uploadError } = await supabase.storage
//     .from("logo")
//     .upload(fileName, file, {
//       cacheControl: "3600",
//       upsert: false,
//     });

//   if (uploadError) {
//     throw toSupabaseError(uploadError);
//   }

//   const {
//     data: { publicUrl },
//   } = supabase.storage.from("logo").getPublicUrl(uploadData.path);

//   logoUrl = publicUrl;
// }



//     if (body.id) {
//       // Update entity
//       const { error: updateError } = await supabase
//         .from("entity")
//         .update({
//           name: body.name,
//           logoUrl: logoUrl,
//           country: body.country,
//         })
//         .eq("id", body.id);

//       if (updateError) throw toSupabaseError(updateError);

//       revalidatePath("/settings");
//       return { message: "Organization updated" };
//     } else {
//       // Insert entity
//       const { error: insertError } = await supabase
//         .from("entity")
//         .insert({
//           name: body.name,
//           logoUrl: logoUrl,
//           country: body.country,
//         });

//       if (insertError) throw toSupabaseError(insertError);

//       revalidatePath("/settings");
//       return { message: "Organization created" };
//     }
//   } catch (err) {
//     console.error(err);
//     return { error: true, message: "Internal Error" };
//   }
// });

export const formAction = validatedActionWithUser(schema, async (body) => {
  try {
    const supabase = await createClient();

    let logoUrl = body.logo;

    // Upload logo file to Supabase Storage if it's a File
    if (Array.isArray(logoUrl) && logoUrl.length > 0 && logoUrl[0] instanceof File) {
      const file = logoUrl[0] as File;
      const fileExt = file.name.split(".").pop() ?? "bin";
      const fileName = `${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from("logo")
        .upload(fileName, file, { upsert: false });

      if (error) throw error;

      logoUrl = supabase.storage
        .from("logo")
        .getPublicUrl(data.path).data.publicUrl;
    }

    if (body.id) {
      // ✏️ Update existing entity
      const { error: updateError } = await supabase
        .from("entity")
        .update({
          name: body.name,
          logoUrl,
          country: body.country,
        })
        .eq("id", body.id);

      if (updateError) throw toSupabaseError(updateError);

      revalidatePath("/settings");
      return { message: "Organization updated" };
    } else {
     
      const { error: insertError } = await supabase
        .from("entity")
        .insert({
          name: body.name,
          logoUrl,
          country: body.country,
        });

      if (insertError) throw toSupabaseError(insertError);

      revalidatePath("/settings");
      return { message: "Organization created" };
    }
  } catch (err) {
    console.error(err);
    return { error: true, message: "Internal Error" };
  }
});
