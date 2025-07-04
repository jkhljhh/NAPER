// // page.tsx
import { createClient } from "@/lib/supabase/server";
import { Form as OrganizationForm } from "./entity/form";

export default async function SettingsPage() {
  const supabase = await createClient();

  const { data: entityData, error: entityError } = await supabase
    .from("entity")
    .select("id, name, logoUrl,country")
    .limit(1)
    .single();

  // const { data: marketData } = await supabase
  //   .from("market")
  //   .select("country")
  //   .eq("entity_id", entityData?.id || "")
  //   .limit(1)
  //   .single();

  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
      <dt className="text-sm/6">
        <h4 className="font-medium">Organization</h4>
        <p className="text-muted-foreground">Organization details</p>
      </dt>
      <dd className="mt-1 text-sm/6 sm:col-span-2 sm:mt-0">
        <div className="flex flex-col h-full max-w-lg gap-6">
          <OrganizationForm
            defaultValues={{
              id: entityData?.id,
              name: entityData?.name || "",
              country: entityData?.country || "",
              logo: entityData?.logoUrl ? [entityData.logoUrl] : [],
            }}
          />
        </div>
      </dd>
    </div>
  );
}
