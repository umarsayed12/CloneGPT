"use client";
import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { ChevronDown, StarsIcon } from "lucide-react";
import Link from "next/link";
import { SiOpenbadges } from "react-icons/si";
import { useAuth } from "@clerk/nextjs";
import UnauthorizedCard from "./ui/unauthorized-card";
type Checked = DropdownMenuCheckboxItemProps["checked"];
export default function DropdownMenuTitle() {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const { isSignedIn, isLoaded } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <h1 className="flex items-center gap-1 text-lg font-semibold cursor-pointer hover:bg-sidebar-accent p-1 rounded-md">
          CloneGPT <ChevronDown className="h-5 w-5" />
        </h1>
      </DropdownMenuTrigger>
      {isSignedIn ? (
        <DropdownMenuContent
          className={`${
            isSignedIn
              ? "w-80 ml-1 md:ml-[30%]"
              : "w-80 h-40 flex items-center md:h-80"
          } rounded-2xl`}
        >
          <DropdownMenuCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowStatusBar}
          >
            <div className="flex items-center gap-2">
              <div>
                <StarsIcon />
              </div>
              <div className="flex flex-col">
                <p className="font-semibold">CloneGPT Plus</p>
                <p className="text-xs">Our smartest model & more</p>
              </div>
              <div>
                <button className="bg-black cursor-pointer text-white p-1 rounded-3xl px-3">
                  Upgrade
                </button>
              </div>
            </div>
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowActivityBar}
          >
            <div className="flex items-center gap-2">
              <div>
                <SiOpenbadges />
              </div>
              <div className="flex flex-col">
                <p className="font-semibold">CloneGPT</p>
                <p className="text-xs">Great for everyday tasks</p>
              </div>
            </div>
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent className="p-0 rounded-2xl">
          <UnauthorizedCard />
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
