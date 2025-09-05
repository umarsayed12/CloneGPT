"use client";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@clerk/nextjs";
import { MultiStepLoader as Loader } from "../../components/ui/multi-step-loader";
import { useRouter } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <SidebarProvider>
      {isSignedIn && <AppSidebar />}
      <main className="w-full">
        <div className="relative flex flex-col w-full">
          {isLoaded && <AppHeader />}
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
