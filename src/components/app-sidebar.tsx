"use client";
import { Images, SearchIcon, SquarePen, X } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { SiOpenai } from "react-icons/si";
import { useEffect } from "react";

// Menu items.
const items = [
  {
    title: "New Chat",
    url: "/",
    icon: SquarePen,
  },
  {
    title: "Search chats",
    url: "/",
    icon: SearchIcon,
  },
  {
    title: "Library",
    url: "/",
    icon: Images,
  },
];

export function AppSidebar() {
  const { toggleSidebar } = useSidebar();
  const { state } = useSidebar();
  return (
    <Sidebar className="py-1" collapsible="icon">
      <SidebarHeader
        className={`px-4 flex ${
          state === "expanded" ? "flex-row" : "flex-col"
        } items-center justify-between`}
      >
        <div className="flex items-center gap-1">
          <SiOpenai
            onClick={toggleSidebar}
            className="text-black dark:text-white cursor-e-resize hover:bg-sidebar-accent"
            title="expand"
          />
        </div>
        {state === "expanded" && <SidebarTrigger className="cursor-e-resize" />}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
