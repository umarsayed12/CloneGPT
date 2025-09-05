"use client";
import {
  Ellipsis,
  Images,
  PencilIcon,
  SearchIcon,
  ShareIcon,
  SquarePen,
  StarsIcon,
  Trash2,
  X,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import { useEffect, useState } from "react";
import { useAllChats } from "@/hooks/use-all-chats";
import { useUser } from "@clerk/nextjs";
import { useChatHistory } from "@/hooks/use-chat-history";
import Link from "next/link";
import { useChatContext } from "@/contexts/chat-context";
import { useDeleteHistory } from "@/hooks/use-delete-history";

const items = [
  {
    title: "New Chat",
    url: "/chat/new",
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
  const { chatRefreshKey } = useChatContext();
  const { chats, loading, refetch } = useAllChats(userId || "");
  const [hoverId, setHoverId] = useState("");
  const [openMenuId, setOpenMenuId] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const { deleteChat, loading: deleteLoading } = useDeleteHistory(userId);
  const handleDeleteSession = async (sessionId: string) => {
    await deleteChat(sessionId);
    refetch();
  };

  useEffect(() => {
    if (chatRefreshKey > 0) {
      refetch();
    }
  }, [chatRefreshKey, refetch]);

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
          {!loading && !deleteLoading ? (
            <SidebarGroupContent>
              <SidebarMenu>
                {chats.map((chat) => (
                  <SidebarMenuItem key={chat.sessionId}>
                    <SidebarMenuButton asChild>
                      <div
                        onMouseEnter={() => setHoverId(chat.sessionId)}
                        onMouseLeave={() => setHoverId("")}
                        className="flex justify-between items-center cursor-pointer"
                      >
                        <Link
                          className="w-[95%] active:bg-accent hover:bg-accent cursor-pointer"
                          href={`/chat/${chat?.sessionId}`}
                        >
                          <div className="w-full flex justify-between items-center">
                            <p className="truncate">
                              {chat?.messages[0]?.content}
                            </p>
                          </div>
                        </Link>
                        {hoverId === chat.sessionId && (
                          <Ellipsis
                            onClick={() => {
                              setOpenMenu((prev) => !prev);
                              setOpenMenuId(chat.sessionId);
                            }}
                            className="w-4 h-4 hover:bg-accent"
                          />
                        )}
                      </div>
                    </SidebarMenuButton>
                    {openMenu && openMenuId === chat.sessionId && (
                      <div className="absolute right-0 z-10 w-[60%] h-[130px] bg-white shadow rounded-2xl flex flex-col justify-center gap-2 p-4 text-sm">
                        <button className="flex items-center justify-start gap-2 hover:bg-gray-100 rounded-md px-2 py-1 transition cursor-pointer">
                          <ShareIcon className="w-4 h-4" />
                          <p>Share</p>
                        </button>
                        <button className="flex items-center justify-start gap-2 hover:bg-gray-100 rounded-md px-2 py-1 transition cursor-pointer">
                          <PencilIcon className="w-4 h-4" />
                          <p>Rename</p>
                        </button>
                        <div className="border-b-2 border-gray-100"></div>
                        <button
                          onClick={() => handleDeleteSession(chat.sessionId)}
                          className="flex items-center justify-start gap-2 hover:bg-red-100 text-red-600 rounded-md px-2 py-1 transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                          <p>Delete</p>
                        </button>
                      </div>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          ) : (
            <></>
          )}
        </SidebarGroup>
        <SidebarFooter className="p-0 m-0">
          <div className="absolute w-full z-10 h-[50px] bg-sidebar bottom-0 border-t-2 flex items-center justify-center gap-1">
            <StarsIcon className="w-4 h-4" />
            <div className="flex flex-col text-xs">
              <p>Upgrade Plan</p>
              <p className="opacity-50">More access to best models</p>
            </div>
          </div>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
