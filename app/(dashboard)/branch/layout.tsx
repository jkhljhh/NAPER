import { SiteHeader } from "@/components/site-header";
import { SiteContent } from "@/components/site-content";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader title="Branch" />
      <SiteContent>{children}</SiteContent>
    </>
  );
}
