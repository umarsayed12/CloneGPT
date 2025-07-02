"use client";
import { useAuth, UserButton } from "@clerk/nextjs";
import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import Link from "next/link";
import DropdownMenuTitle from "./dropdown-menu";
type Checked = DropdownMenuCheckboxItemProps["checked"];
export function AppHeader() {
  const { isSignedIn, isLoaded } = useAuth();
  return (
    <div className="p-2 border-b-2 w-full flex justify-between">
      <div className="flex items-center">
        <SidebarTrigger className="md:hidden cursor-e-resize" />
        <DropdownMenuTitle />
      </div>
      {isSignedIn ? (
        <UserButton />
      ) : (
        <div className="flex items-center gap-x-3">
          <Link href={"/sign-in"}>
            <Button className="rounded-full cursor-pointer">Login</Button>
          </Link>
          <Link href={"/sign-up"}>
            <Button
              variant={"outline"}
              className="rounded-full cursor-pointer hidden md:flex"
            >
              Sign up for free
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
