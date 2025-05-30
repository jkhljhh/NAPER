export function SiteContent({ children }: React.ComponentProps<"div">) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <main className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
          {children}
        </main>
      </div>
    </div>
  );
}
