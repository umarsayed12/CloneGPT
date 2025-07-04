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
import { useAllChats } from "@/hooks/use-all-chats";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

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
  const { user } = useUser();
  const userId = user?.id;
  const { chats, loading } = useAllChats(userId || "");
  console.log(chats);

  const { toggleSidebar } = useSidebar();
  const { state } = useSidebar();
  if (loading) return <>Please Wait...</>;
  else
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
          {state === "expanded" && (
            <SidebarTrigger className="cursor-e-resize" />
          )}
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Chats</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {chats.map((chat) => (
                  <SidebarMenuItem key={chat.sessionId}>
                    <SidebarMenuButton asChild>
                      <Link
                        className="active:bg-accent hover:bg-accent cursor-pointer"
                        href={`/api/chat/${chat?.sessionId}`}
                      >
                        <p className="truncate">{chat?.messages[0]?.content}</p>
                      </Link>
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
