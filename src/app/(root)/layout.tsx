"use client";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) return <>Please Wait...</>;

  return (
    <SidebarProvider>
      {isSignedIn && <AppSidebar />}
      <main className="w-full">
        <div className="relative flex flex-col w-full">
          <AppHeader />
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
