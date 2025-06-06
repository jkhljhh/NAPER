import { createClient } from "@/lib/supabase/server";

import { Form as EntityCreateEditForm } from "./entity/create-edit/form";
import { Form as EntityUploadLogoForm } from "./entity/upload-logo/form";
import { Form as MarketCreateEditForm } from "./market/form";

export default async function SettingsPage() {
  const supabase = await createClient();

  const { data: entityData, error: entityError } = await supabase
    .from("entity")
    .select("id, name")
    .limit(1)
    .single();

  const { data: marketData, error: marketError } = await supabase
    .from("market")
    .select("id, country, currency, fy_month")
    .limit(1)
    .single();

  return (
    <dl className="divide-y">
      <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
        <dt className="text-sm/6">
          <h4 className="font-medium">Entity</h4>
          <p className="text-muted-foreground">Entity description</p>
        </dt>
        <dd className="mt-1 text-sm/6 sm:col-span-2 sm:mt-0">
          <div className="flex flex-col h-full max-w-lg gap-6">
            {entityError ? (
              <EntityCreateEditForm
                defaultValues={{
                  name: "",
                }}
              />
            ) : (
              <>
                <EntityCreateEditForm
                  defaultValues={{
                    id: entityData.id,
                    name: entityData.name,
                  }}
                />

                <EntityUploadLogoForm
                  defaultValues={{
                    id: entityData.id,
                    logo: [],
                  }}
                />
              </>
            )}
          </div>
        </dd>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
        <dt className="text-sm/6">
          <h4 className="font-medium">Market</h4>
          <p className="text-muted-foreground">Market description</p>
        </dt>
        <dd className="mt-1 text-sm/6 sm:col-span-2 sm:mt-0">
          <div className="flex flex-col h-full max-w-lg gap-6">
            {!entityError && (
              <>
                {marketError ? (
                  <MarketCreateEditForm
                    defaultValues={{
                      entity_id: entityData.id,
                      currency: "",
                      country: "",
                      fy_month: "",
                    }}
                  />
                ) : (
                  <MarketCreateEditForm
                    defaultValues={{
                      id: marketData.id,
                      entity_id: entityData.id,
                      currency: marketData.currency,
                      country: marketData.country,
                      fy_month: marketData.fy_month,
                    }}
                  />
                )}
              </>
            )}
          </div>
        </dd>
      </div>
    </dl>
  );
}
