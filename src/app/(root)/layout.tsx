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
  const router = useRouter();
  if (!isLoaded) return <>Please Wait...</>;
  if (!isSignedIn) {
    router.push("/sign-in");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="relative flex flex-col w-full">
          <SidebarTrigger className="cursor-e-resize hover:bg-sidebar-accent" />
          <AppHeader />
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
