"use client";
import { Images, SearchIcon, SquarePen, X } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { SiOpenai } from "react-icons/si";

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
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex justify-between items-center">
            <SidebarGroupLabel className="flex gap-1">
              <SiOpenai className="text-black dark:text-white cursor-pointer" />
              <p>CloneGPT</p>
            </SidebarGroupLabel>
            <button onClick={toggleSidebar} className="sm:hidden">
              <X className="w-5 h-5" />
            </button>
          </div>
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
