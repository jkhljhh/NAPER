import Link from "next/link";

import { site } from "@/config/site";
import Image from "next/image";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/*  */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex gap-2 items-center">
            {/* <IconInnerShadowTop className="!size-5" /> */}
            <Image
              src="/logo.svg"
              width={156.669}
              height={201.459}
              alt={site.title}
              className="w-8"
            />
            <span className="text-4xl font-semibold">{site.title}</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
      {/*  */}
      <div className="bg-[linear-gradient(45deg,_#42307D,_#7F56D9)] relative hidden lg:block overflow-hidden">
        <Image
          src="/auth-pattern.svg"
          alt="pattern"
          width={298}
          height={408}
          className="absolute top-0 right-0"
        />
        <Image
          src="/auth-pattern.svg"
          alt="pattern"
          width={298}
          height={408}
          className="absolute -bottom-2/6 -left-12"
        />
        <div className="flex items-center justify-center h-full w-full">
          <Image
            src="/featured.jpeg"
            alt="featured"
            width={678}
            height={704}
            className="rounded-xl w-[350px] z-10"
          />
        </div>
      </div>
      {/*  */}
    </div>
  );
}

// export default function SignInPage() {
//   return (
//     <div className="grid min-h-svh lg:grid-cols-2">
//       <div className="flex flex-col gap-4 p-6 md:p-10">
//         <div className="flex justify-center gap-2 md:justify-start">
//           <Link
//             href="/"
//             className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 text-sm data-[slot=sidebar-menu-button]:!p-1.5"
//           >
//             <IconInnerShadowTop className="!size-5" />
//             <span className="text-base font-semibold">{site.title}</span>
//           </Link>
//         </div>
//         <div className="flex flex-1 items-center justify-center">
//           <div className="w-full max-w-xs">
//             <LoginForm />
//           </div>
//         </div>
//       </div>
//       <div className="bg-muted relative hidden lg:block">
//         <img
//           src="/placeholder.svg"
//           alt="Image"
//           className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
//         />
//       </div>
//     </div>
//   );
// }
