// Filename: layout.tsx
// Path: @/app/(dashboard)/
import { redirect } from "next/navigation";

import { AppSidebar, AppSidebarBreadcrumb } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/server";
import { SiteContent } from "@/components/site-content";
import { SiteHeader } from "@/components/site-header";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/sign-in");
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" user={data.user} />
      <SidebarInset>
        <SiteHeader>
          <AppSidebarBreadcrumb />
        </SiteHeader>
        <SiteContent>{children}</SiteContent>
      </SidebarInset>
    </SidebarProvider>
  );
}
