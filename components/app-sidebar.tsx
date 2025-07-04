"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { User } from "@supabase/supabase-js";
import { IconChevronRight, TablerIcon, type Icon } from "@tabler/icons-react";

import { NavUser } from "@/components/nav-user";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Sidebar,
  SidebarMenu,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { site } from "@/config/site";
import { navigation } from "@/config/sidebar";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: User;
};

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <Image
                  src="/logo.svg"
                  width={156.669}
                  height={201.459}
                  alt={site.title}
                  className="w-4"
                />
                <span className="text-base font-semibold">{site.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navigation.main.map((item) => (
              <NavItem
                key={item.title}
                item={item}
                pathname={pathname}
                parentUrl=""
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

type NavItem = {
  title: string;
  url: string;
  icon?: TablerIcon;
  isActive?: boolean;
  items?: NavItem[];
};

function NavItem({
  item,
  pathname,
  parentUrl,
}: {
  item: NavItem;
  pathname: string;
  parentUrl: string;
}) {
  const fullUrl = parentUrl + item.url;
  const hasChildren = item.items && item.items.length > 0;

  if (hasChildren) {
    return (
      <Collapsible
        key={item.title}
        asChild
        defaultOpen={item.isActive}
        className="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
              <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items?.map((subItem) => (
                <NavItem
                  key={subItem.title}
                  item={subItem}
                  pathname={pathname}
                  parentUrl={fullUrl}
                />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuSubItem key={item.title}>
      <SidebarMenuSubButton asChild>
        <Link href={fullUrl} data-active={pathname === fullUrl}>
          <span>{item.title}</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}

export function AppSidebarBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  function formatSegment(segment: string) {
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{formatSegment(segment)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>
                    {formatSegment(segment)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
